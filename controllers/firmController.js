<<<<<<< HEAD
const Firm = require("../models/Firm");
const Vendor = require("../models/Vendor");
const { upload } = require("../config/cloudinary");

exports.addFirm = [
  upload.single("image"),
  async (req, res) => {
    try {
      const { firmName, area, category, region, offer } = req.body;

      const vendor = await Vendor.findById(req.vendorId);
      if (!vendor) return res.status(404).json({ error: "Vendor not found" });

      if (vendor.firm.length > 0) {
        return res.status(400).json({ error: "Vendor can only have one firm" });
      }

      const newFirm = new Firm({
        firmName,
        area,
        category,
        region,
        offer,
        image: req.file?.path,
        vendor: vendor._id,
      });

      await newFirm.save();
      vendor.firm.push(newFirm);
      await vendor.save();

      res.status(201).json(newFirm);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
];

exports.deleteFirmById = async (req, res) => {
  const firm = await Firm.findByIdAndDelete(req.params.firmId);
  if (!firm) return res.status(404).json({ error: "Firm not found" });
  res.json({ message: "Firm deleted" });
};
=======
const Firm = require('../models/Firm');
const Vendor = require('../models/Vendor');

const addFirm = async (req, res) => {
  try {
    const { firmName, area, category, region, offer } = req.body;

    const image = req.file ? req.file.path : undefined;

    const vendor = await Vendor.findById(req.vendorId);
    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    if (vendor.firm.length > 0) {
      return res.status(400).json({ message: "vendor can have only one firm" });
    }

    const firm = new Firm({
      firmName,
      area,
      category,
      region,
      offer,
      image,
      vendor: vendor._id
    });

    const savedFirm = await firm.save();

    const firmId = savedFirm._id;
    const vendorFirmName = savedFirm.firmName;

    vendor.firm.push(savedFirm);
    await vendor.save();

    return res.status(200).json({ message: 'Firm Added successfully', firmId, vendorFirmName });

  } catch (error) {
    console.error(error);
    res.status(500).json("internal server error");
  }
};

const deleteFirmById = async (req, res) => {
  try {
    const firmId = req.params.firmId;

    const deletedFirm = await Firm.findByIdAndDelete(firmId);

    if (!deletedFirm) {
      return res.status(404).json({ error: "No firm found" });
    }
    res.status(200).json({ message: "Firm deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { addFirm, deleteFirmById };
>>>>>>> f61c7dd (added cloudinary config and changed come controller and routes)
