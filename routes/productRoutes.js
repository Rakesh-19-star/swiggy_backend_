const express = require("express");
const productController = require("../controllers/productController");
<<<<<<< HEAD
=======
const { storage } = require('../configure/cloudinaryConfig');
const multer = require('multer');
const path = require('path');
>>>>>>> f61c7dd (added cloudinary config and changed come controller and routes)

const router = express.Router();
const cloudinaryMulter = multer({ storage });

<<<<<<< HEAD
router.post("/add/:firmId", productController.addProduct);
router.get("/:firmId", productController.getProductByFirm);
router.delete("/:productId", productController.deleteProductById);

=======
router.post('/add-product/:firmId', cloudinaryMulter.single('image'), productController.addProduct);

router.get('/:firmId/products', productController.getProductByFirm);

router.get('/uploads/:imageName', (req, res) => {
  const imageName = req.params.imageName;
  res.header('Content-Type', 'image/jpeg');
  res.sendFile(path.join(__dirname, '..', 'uploads', imageName));
});

router.delete('/:productId', productController.deleteProductById);

>>>>>>> f61c7dd (added cloudinary config and changed come controller and routes)
module.exports = router;
