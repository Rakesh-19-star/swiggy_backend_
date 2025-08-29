const express = require("express");
const vendorController = require("../controllers/vendorController");

const router = express.Router();

router.post("/register", vendorController.vendorRegister);
router.post("/login", vendorController.vendorLogin);
router.get("/all", vendorController.getAllVendors);
router.get("/:vendorId", vendorController.getVendorById);

<<<<<<< HEAD
=======
router.get('/all-vendors', vendorController.getAllVendors);
router.get('/single-vendor/:vendorId', vendorController.getVendorById);

>>>>>>> f61c7dd (added cloudinary config and changed come controller and routes)
module.exports = router;
