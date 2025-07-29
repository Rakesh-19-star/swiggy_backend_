const Firm = require('../models/Firm');
const Vendor = require('../models/Vendor');
const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/'); // Destination folder where the uploaded images will be stored
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Generating a unique filename
    }
});

const upload = multer({ storage: storage });

const addFirm = async(req, res) => {
    try {
        const { firmName, area, category, region, offer } = req.body;

        const image = req.file ? req.file.filename : undefined;

        const vendor = await Vendor.findById(req.vendorId);
        if (!vendor) {
            return res.status(404).json({ message: "Vendor not found" })
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
        })

        const savedFirm = await firm.save();

        const firmId = savedFirm._id
        const vendorFirmName = savedFirm.firmName

        vendor.firm.push(savedFirm)

        await vendor.save()



        return res.status(200).json({ message: 'Firm Added successfully ', firmId, vendorFirmName });


    } catch (error) {
        console.error(error)
        res.status(500).json("intenal server error")
    }
}

const deleteFirmById = async (req, res) => {
    try {
        const firmId = req.params.firmId;

        const firm = await Firm.findByIdAndDelete(firmId);

        if (!firm) {
            return res.status(404).json({ message: 'Firm not found' });
        }

        // Dissociate vendors from the deleted firm
        await Vendor.updateMany(
            { firmId: firmId },
            { $unset: { firmId: "" } }
        );

        res.status(200).json({ message: 'Firm deleted and vendors updated' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { addFirm: [upload.single('image'), addFirm], deleteFirmById }