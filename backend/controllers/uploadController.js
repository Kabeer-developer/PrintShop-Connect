const FileUpload = require("../models/FileUpload");
const Store = require("../models/Store");
const cloudinary = require("../utils/cloudinary");
const streamifier = require("streamifier");

const uploadToCloudinary = (buffer, resourceType) =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "customer_uploads", resource_type: resourceType },
      (err, result) => (result ? resolve(result) : reject(err))
    );
    streamifier.createReadStream(buffer).pipe(stream);
  });

const uploadFile = async (req, res, next) => {
  try {
    const { uploaderName, note } = req.body;
    const storeId = req.params.storeId;

    if (!uploaderName) {
      return res.status(400).json({ message: "Name required" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const store = await Store.findById(storeId);
    if (!store) {
      return res.status(404).json({ message: "Store not found" });
    }

    const resourceType =
      req.file.mimetype === "application/pdf" ? "raw" : "auto";

    const result = await uploadToCloudinary(req.file.buffer, resourceType);

   const file = await FileUpload.create({
  shop: storeId,
  userName: uploaderName,
  note,
  fileUrl: result.secure_url,
  fileType: req.file.mimetype,
  originalFileName: req.file.originalname,
  status: "pending",
  cloudinaryPublicId: result.public_id
});


    res.status(201).json(file);
  } catch (err) {
    next(err);
  }
};

const getStoreUploads = async (req, res, next) => {
  try {
    const storeId = req.params.storeId;

    const files = await FileUpload.find({ shop: storeId })
  .sort({ createdAt: -1 });


    res.json(files);
  } catch (err) {
    next(err);
  }
};

const deleteFile = async (req, res, next) => {
  try {
    const file = await FileUpload.findById(req.params.fileId);
    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

    if (file.cloudinaryPublicId) {
      await cloudinary.uploader.destroy(file.cloudinaryPublicId, {
        resource_type: file.fileType === "application/pdf" ? "raw" : "auto"
      });
    }

    await file.deleteOne();

    res.json({ message: "Deleted" });
  } catch (err) {
    next(err);
  }
};


module.exports = {
  uploadFile,
  getStoreUploads,
  deleteFile
};
