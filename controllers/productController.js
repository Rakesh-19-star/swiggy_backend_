const Product = require("../models/Product");
const multer = require("multer");
const Firm = require('../models/Firm')
const path = require('path');


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/'); // Destination folder where the uploaded images will be stored
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Generating a unique filename
    }
});

const upload = multer({ storage: storage });

const addProduct = async(req, res) => {
    try {
        const { productName, price, category, bestSeller, description } = req.body;
        const image = req.file ? req.file.filename : undefined;

        const firmId = req.params.firmId;
        const firm = await Firm.findById(firmId);

        if (!firm) {
            return res.status(404).json({ error: "No firm found" });
        }

        const product = new Product({
            productName,
            price,
            category,
            bestSeller,
            description,
            image,
            firm: firm._id
        })

        const savedProduct = await product.save();
        firm.products.push(savedProduct);


        await firm.save()

        res.status(200).json(savedProduct)

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" })
    }
}

const getProductByFirm = async(req, res) => {
    try {
        const firmId = req.params.firmId;
        const firm = await Firm.findById(firmId);

        if (!firm) {
            return res.status(404).json({ error: "No firm found" });
        }

        const restaurantName = firm.firmName;
        const products = await Product.find({ firm: firmId });

        res.status(200).json({ restaurantName, products });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" })
    }
}

const deleteProductById = async (req, res) => {
    try {
        const productId = req.params.productId;

        // Find the product to get the firmId
        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        const firmId = product.firmId;

        // Delete the product
        await Product.findByIdAndDelete(productId);

        // Update the firm to remove the product reference
        await Firm.findByIdAndUpdate(firmId, {
            $pull: { products: productId } // assuming products is an array of ObjectIds
        });

        res.status(200).json({ message: 'Product deleted and firm updated' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { addProduct: [upload.single('image'), addProduct], getProductByFirm, deleteProductById };