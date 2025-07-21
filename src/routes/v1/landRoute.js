const express = require("express");
const LandController = require("../../controllers/LandController");
const { upload } = require("../../middlewares/multer.middleware");

const router = express.Router();

// GET all lands
router.get("/", LandController.getAllLands);
// GET single land
router.get("/:id", LandController.getLandById);
// CREATE land (multiple images)
router.post("/", upload.array("images", 10), LandController.createLand);
// UPDATE land (multiple images)
router.put("/:id", upload.array("images", 10), LandController.updateLand);
// DELETE land
router.delete("/:id", LandController.deleteLand);

module.exports = router;
