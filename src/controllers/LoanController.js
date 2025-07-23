const Loan = require("../models/LoanModel");

// Get all loans
exports.getLoans = async (req, res, next) => {
  try {
    const loans = await Loan.find();
    res.status(200).json({ success: true, data: loans });
  } catch (error) {
    next(error);
  }
};

// Create a new loan
exports.createLoan = async (req, res, next) => {
  try {
    const { name, email, mobilenumber, message } = req.body;
    const loan = await Loan.create({ name, email, mobilenumber, message });
    res.status(201).json({ success: true, data: loan });
  } catch (error) {
    next(error);
  }
};

// Delete a loan by id
exports.deleteLoan = async (req, res, next) => {
  try {
    const { id } = req.params;
    const loan = await Loan.findByIdAndDelete(id);
    if (!loan) {
      return res
        .status(404)
        .json({ success: false, message: "Loan not found" });
    }
    res.status(200).json({ success: true, message: "Loan deleted" });
  } catch (error) {
    next(error);
  }
};
