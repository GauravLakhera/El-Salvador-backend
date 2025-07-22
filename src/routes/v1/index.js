const express = require("express");
const router = express.Router();
const healthCheck = require("./healthCheckRoute.js");
const landRoute = require("./landRoute");
const galleryRoute = require("./galleryRoute");
const contactUsRoute = require("./contactUsRoute");

router.use("/health", healthCheck);
router.use("/lands", landRoute);
router.use("/gallery", galleryRoute);
router.use("/contact-us", contactUsRoute);

module.exports = router;
