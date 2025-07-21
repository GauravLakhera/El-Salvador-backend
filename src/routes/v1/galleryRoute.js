const express = require("express");
const router = express.Router();
const GalleryController = require("../../controllers/GalleryController");
const { upload } = require("../../middlewares/multer.middleware");

// GET all gallery items
router.get("/", GalleryController.getGallery);

// POST a new gallery item (with file upload)
router.post("/", upload.single("file"), GalleryController.createGallery);

// DELETE a gallery item by ID
router.delete("/:id", GalleryController.deleteGallery);

module.exports = router;
