const express = require("express");
const vendorController = require("../controllers/vendorController");

const router = express.Router();

router.post("/register", vendorController.vendorRegister);
router.post("/login", vendorController.vendorLogin);
router.get("/all", vendorController.getAllVendors);
router.get("/:vendorId", vendorController.getVendorById);

module.exports = router;
