const Product = require("../models/Product");
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
