const express = require('express');
const router = express.Router();
const { getTransactions, addTransaction, deleteTransaction } = require('../controllers/transactions');

router
  .route('/')
  .get(getTransactions)
  .post(addTransaction);

router
  .route('/:id')  // corrected route for deleting by ID
  .delete(deleteTransaction);

module.exports = router;
