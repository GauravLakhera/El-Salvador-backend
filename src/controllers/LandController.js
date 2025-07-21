const Land = require("../models/LandModel");
const {
  uploadFile,
  destroyFile,
  getPublicIdFromCloudinaryUrl,
} = require("../services/cloudinary");
const asyncHandler = require("../utils/asyncHandler");
const ErrorHandler = require("../utils/ErrorHandler");
const sendResponse = require("../utils/sendResponse");
const fs = require("fs");

// GET all lands
exports.getAllLands = asyncHandler(async (req, res) => {
  const lands = await Land.find();
  sendResponse(res, { data: lands, message: "Lands fetched successfully" });
});

// GET single land by ID
exports.getLandById = asyncHandler(async (req, res, next) => {
  const land = await Land.findById(req.params.id);
  if (!land) return next(new ErrorHandler("Land not found", 404));
  sendResponse(res, { data: land, message: "Land fetched successfully" });
});

// CREATE land
exports.createLand = asyncHandler(async (req, res, next) => {
  // Handle images
  let images = [];
  if (req.files && req.files.length > 0) {
    for (const file of req.files) {
      const result = await uploadFile(file.path, "image", "lands");
      images.push(result.secure_url);
    }
  }
  const landData = { ...req.body, images };
  try {
    const land = await Land.create(landData);
    sendResponse(res, {
      data: land,
      message: "Land created successfully",
      statusCode: 201,
    });
  } catch (err) {
    // Clean up uploaded images if DB save fails
    for (const img of images) {
      const publicId = getPublicIdFromCloudinaryUrl(img.url);
      if (publicId) await destroyFile(publicId);
    }
    next(err);
  }
});

// UPDATE land
exports.updateLand = asyncHandler(async (req, res, next) => {
  const land = await Land.findById(req.params.id);
  if (!land) return next(new ErrorHandler("Land not found", 404));

  // Handle new images
  let newImages = [];
  if (req.files && req.files.length > 0) {
    for (const file of req.files) {
      const result = await uploadFile(file.path, "image", "lands");
      newImages.push(result.secure_url);
    }
  }
  // Optionally handle image removal (by url or index)
  if (req.body.imagesToDelete) {
    let removeUrls = req.body.imagesToDelete;

    // Handle string JSON or direct array
    if (typeof removeUrls === "string") {
      removeUrls = JSON.parse(removeUrls);
    }

    // Ensure it's an array and flatten if needed
    removeUrls = Array.isArray(removeUrls) ? removeUrls : [removeUrls];

    for (const url of removeUrls) {
      const publicId = getPublicIdFromCloudinaryUrl(url);
      if (publicId) await destroyFile(publicId);
      land.images = land.images.filter((imgUrl) => imgUrl !== url);
    }
  }

  // Merge images
  land.images = [...land.images, ...newImages];
  // Optionally set primary image
  if (req.body.primaryImageUrl) {
    land.images.forEach(
      (img) => (img.isPrimary = img.url === req.body.primaryImageUrl)
    );
  }
  // Update other fields
  Object.keys(req.body).forEach((key) => {
    if (key !== "removeImageUrls" && key !== "primaryImageUrl") {
      land[key] = req.body[key];
    }
  });
  await land.save();
  sendResponse(res, { data: land, message: "Land updated successfully" });
});

// DELETE land
exports.deleteLand = asyncHandler(async (req, res, next) => {
  const land = await Land.findById(req.params.id);
  if (!land) return next(new ErrorHandler("Land not found", 404));
  // Delete all images from Cloudinary
  for (const img of land.images) {
    const publicId = getPublicIdFromCloudinaryUrl(img.url);
    if (publicId) await destroyFile(publicId);
  }
  await land.deleteOne();
  sendResponse(res, { message: "Land deleted successfully" });
});
