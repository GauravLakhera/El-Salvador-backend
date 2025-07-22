const ContactUs = require("../models/ContactUsModel");
const asyncHandler = require("../utils/asyncHandler");
const sendResponse = require("../utils/sendResponse");
const ErrorHandler = require("../utils/ErrorHandler");

// Get all contact us entries, latest first
exports.getAllContactUs = asyncHandler(async (req, res, next) => {
  const contacts = await ContactUs.find().sort({ createdAt: -1 });
  sendResponse(res, {
    statusCode: 200,
    success: true,
    data: contacts,
    message: "Contact entries fetched successfully",
  });
});

// Create a new contact us entry
exports.createContactUs = asyncHandler(async (req, res, next) => {
  const { fullName, email, phone, country, serviceInInterest, message } =
    req.body;
  const contact = await ContactUs.create({
    fullName,
    email,
    phone,
    country,
    serviceInInterest,
    message,
  });
  sendResponse(res, {
    statusCode: 201,
    success: true,
    data: contact,
    message: "Contact entry created successfully",
  });
});

// Delete a contact us entry by id
exports.deleteContactUs = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const contact = await ContactUs.findByIdAndDelete(id);
  if (!contact) return next(new ErrorHandler("Contact entry not found", 404));
  sendResponse(res, {
    statusCode: 200,
    success: true,
    data: contact,
    message: "Contact entry deleted successfully",
  });
});
