<<<<<<< HEAD
const express = require("express");
const firmController = require("../controllers/firmController");
const verifyToken = require("../middlewares/verifyToken");

const router = express.Router();

router.post("/add", verifyToken, firmController.addFirm);
router.delete("/:firmId", firmController.deleteFirmById);
=======
const express = require('express');
const firmController = require('../controllers/firmController');
const verifyToken = require('../middlewares/verifyToken');
const { storage } = require('../configure/cloudinaryConfig');
const multer = require('multer');
const path = require('path');

const router = express.Router();
const cloudinaryMulter = multer({ storage });

router.post('/add-firm', verifyToken, cloudinaryMulter.single('image'), firmController.addFirm);

router.get('/uploads/:imageName', (req, res) => {
  const imageName = req.params.imageName;
  res.header('Content-Type', 'image/jpeg');
  res.sendFile(path.join(__dirname, '..', 'uploads', imageName));
});

router.delete('/:firmId', firmController.deleteFirmById);
>>>>>>> f61c7dd (added cloudinary config and changed come controller and routes)

module.exports = router;
