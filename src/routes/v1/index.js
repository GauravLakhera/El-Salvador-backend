const express = require("express");
const router = express.Router();
const healthCheck = require("./healthCheckRoute.js");
const landRoute = require("./landRoute");
const galleryRoute = require("./galleryRoute");

router.use("/health", healthCheck);
router.use("/lands", landRoute);
router.use("/gallery", galleryRoute);

module.exports = router;
