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
