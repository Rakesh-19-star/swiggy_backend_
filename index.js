const express = require("express");
<<<<<<< HEAD
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");

const vendorRoutes = require("./routes/vendorRoutes");
const firmRoutes = require("./routes/firmRoutes");
const productRoutes = require("./routes/productRoutes");
=======
const dotEnv = require('dotenv');
const mongoose = require('mongoose');
const vendorRoutes = require('./routes/vendorRoutes');
const bodyParser = require('body-parser');
const firmRoutes = require('./routes/firmRoutes');
const productRoutes = require('./routes/productRoutes');
const cors = require('cors');
const path = require('path');

const app = express();
>>>>>>> f61c7dd (added cloudinary config and changed come controller and routes)

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

<<<<<<< HEAD
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

// Routes
app.use("/vendor", vendorRoutes);
app.use("/firm", firmRoutes);
app.use("/product", productRoutes);

app.get("/", (req, res) => res.send("Welcome to SUBY Backend 🚀"));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected ✅");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error(err));
=======
dotEnv.config();

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization", "token"]
}));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected successfully!"))
  .catch((error) => console.log(error));

app.use(bodyParser.json());

app.use('/vendor', vendorRoutes);
app.use('/firm', firmRoutes);
app.use('/product', productRoutes);

app.use('/uploads', express.static('uploads'));

app.listen(PORT, () => {
  console.log(`server started and running at ${PORT}`);
});

app.use('/', (req, res) => {
  res.send("<h1> Welcome to SUBY </h1>");
});
>>>>>>> f61c7dd (added cloudinary config and changed come controller and routes)
