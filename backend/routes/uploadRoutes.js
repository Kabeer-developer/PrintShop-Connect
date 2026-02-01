const express = require("express");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

const {
  uploadFile,
  getStoreUploads,
  deleteFile
} = require("../controllers/uploadController");

const { protectShop } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/:storeId", upload.single("file"), uploadFile);
router.get("/files/:storeId", protectShop, getStoreUploads);
router.delete("/files/:fileId", protectShop, deleteFile);

module.exports = router;
