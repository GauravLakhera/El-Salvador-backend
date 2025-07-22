const express = require("express");
const router = express.Router();
const ContactUsController = require("../../controllers/ContactUsController");

router.get("/", ContactUsController.getAllContactUs);
router.post("/", ContactUsController.createContactUs);
router.delete("/:id", ContactUsController.deleteContactUs);

module.exports = router;
