const Gallery = require("../models/GalleryModel");
const asyncHandler = require("../utils/asyncHandler");
const sendResponse = require("../utils/sendResponse");
const ErrorHandler = require("../utils/ErrorHandler");
const { uploadFile } = require("../services/cloudinary");
const path = require("path");

// Get all gallery items
exports.getGallery = asyncHandler(async (req, res, next) => {
  const gallery = await Gallery.find();
  sendResponse(res, 200, true, gallery, "Gallery fetched successfully");
});

// Add a new gallery item
exports.createGallery = asyncHandler(async (req, res, next) => {
  const { type, title } = req.body;
  // File must be present
  if (!req.file) {
    return next(new ErrorHandler("File is required", 400));
  }
  if (!type) {
    return next(new ErrorHandler("type is required", 400));
  }

  // File size checks
  const fileSizeMB = req.file.size / (1024 * 1024);
  let resourceType = "auto";
  if (type === "video") {
    if (fileSizeMB > 40) {
      return next(new ErrorHandler("Video size should not exceed 40MB", 400));
    }
    resourceType = "video";
  } else if (type === "image") {
    if (fileSizeMB > 10) {
      return next(new ErrorHandler("Image size should not exceed 10MB", 400));
    }
    resourceType = "image";
  } else {
    return next(
      new ErrorHandler("Invalid type. Only image or video allowed.", 400)
    );
  }

  // Upload to Cloudinary
  let uploadResult;
  try {
    uploadResult = await uploadFile(req.file.path, resourceType, "gallery");
  } catch (err) {
    return next(new ErrorHandler("Failed to upload file to Cloudinary", 500));
  }

  const url = uploadResult.secure_url;
  const galleryItem = await Gallery.create({ url, type, title });
  sendResponse(
    res,
    201,
    true,
    galleryItem,
    "Gallery item created successfully"
  );
});

// Delete a gallery item by ID
exports.deleteGallery = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const galleryItem = await Gallery.findByIdAndDelete(id);
  if (!galleryItem) {
    return next(new ErrorHandler("Gallery item not found", 404));
  }
  sendResponse(
    res,
    200,
    true,
    galleryItem,
    "Gallery item deleted successfully"
  );
});
