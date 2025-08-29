const Product = require("../models/Product");
<<<<<<< HEAD
const Firm = require("../models/Firm");
const { upload } = require("../config/cloudinary");

exports.addProduct = [
  upload.single("image"),
  async (req, res) => {
    try {
      const { productName, price, category, bestSeller, description } = req.body;
      const firmId = req.params.firmId;

      const firm = await Firm.findById(firmId);
      if (!firm) return res.status(404).json({ error: "Firm not found" });

      const newProduct = new Product({
        productName,
        price,
        category,
        bestSeller,
        description,
        image: req.file?.path,
        firm: firm._id,
      });

      await newProduct.save();
      firm.products.push(newProduct);
      await firm.save();

      res.status(201).json(newProduct);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
];

exports.getProductByFirm = async (req, res) => {
  const firm = await Firm.findById(req.params.firmId);
  if (!firm) return res.status(404).json({ error: "Firm not found" });

  const products = await Product.find({ firm: firm._id });
  res.json({ restaurantName: firm.firmName, products });
};

exports.deleteProductById = async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.productId);
  if (!product) return res.status(404).json({ error: "Product not found" });
  res.json({ message: "Product deleted" });
};
=======
const Firm = require('../models/Firm');
const path = require('path');

const addProduct = async (req, res) => {
  try {
    const { productName, price, category, bestSeller, description } = req.body;
    const image = req.file ? req.file.path : undefined;

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
    });

    const savedProduct = await product.save();
    firm.products.push(savedProduct);
    await firm.save();

    res.status(200).json(savedProduct);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getProductByFirm = async (req, res) => {
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
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteProductById = async (req, res) => {
  try {
    const productId = req.params.productId;

    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ error: "No product found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { addProduct, getProductByFirm, deleteProductById };
>>>>>>> f61c7dd (added cloudinary config and changed come controller and routes)
