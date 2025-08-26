const Vendor = require("../models/Vendor");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const secretKey = process.env.JWT_SECRET;

exports.vendorRegister = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (await Vendor.findOne({ email })) {
      return res.status(400).json({ error: "Email already taken" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newVendor = new Vendor({ username, email, password: hashedPassword });
    await newVendor.save();

    res.status(201).json({ message: "Vendor registered successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.vendorLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const vendor = await Vendor.findOne({ email });

    if (!vendor || !(await bcrypt.compare(password, vendor.password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ vendorId: vendor._id }, secretKey, { expiresIn: "1h" });

    res.status(200).json({ success: "Login successful", token, vendorId: vendor._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllVendors = async (req, res) => {
  const vendors = await Vendor.find().populate("firm");
  res.json(vendors);
};

exports.getVendorById = async (req, res) => {
  const vendor = await Vendor.findById(req.params.vendorId).populate("firm");
  if (!vendor) return res.status(404).json({ error: "Vendor not found" });
  res.json(vendor);
};
