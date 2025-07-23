const express = require("express");
const router = express.Router();
const LoanController = require("../../controllers/LoanController");

router.get("/", LoanController.getLoans);
router.post("/", LoanController.createLoan);
router.delete("/:id", LoanController.deleteLoan);

module.exports = router;
