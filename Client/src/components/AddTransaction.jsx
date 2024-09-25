import React, { useState, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

export const AddTransaction = () => {
  const [text, setText] = useState('');
  const [amount, setAmount] = useState('');

  const { addTransaction } = useContext(GlobalContext);

  const onSubmit = e => {
    e.preventDefault();

    if (text.trim() === '' || amount.trim() === '') {
      alert('Please enter a valid text and amount');
      return;
    }

    // Remove commas and trim extra spaces
    let formattedAmount = amount.replace(/,/g, '').trim();

    // Validate and ensure only numbers, +, or - signs are present
    const validAmountPattern = /^[+-]?\d+(\.\d+)?$/;
    if (!validAmountPattern.test(formattedAmount)) {
      alert('Please enter a valid amount. Only numbers, +, and - signs are allowed.');
      return;
    }

    // Ensure + or - sign is included if no sign is present
    if (!formattedAmount.startsWith('+') && !formattedAmount.startsWith('-')) {
      formattedAmount = `+${formattedAmount}`;
    }

    const numericAmount = parseFloat(formattedAmount);

    if (isNaN(numericAmount)) {
      alert('Please enter a valid amount');
      return;
    }

    const newTransaction = {
      _id: Math.floor(Math.random() * 100000000),
      text,
      amount: numericAmount
    };

    addTransaction(newTransaction);
    setText('');
    setAmount('');
  };

  const handleAmountChange = e => {
    // Allow only numbers, +, - signs, and commas
    const inputValue = e.target.value;
    const cleanedValue = inputValue.replace(/[^0-9,+,-]/g, '');

    setAmount(cleanedValue);
  };

  return (
    <>
      <h3>Add new transaction</h3>
      <form onSubmit={onSubmit}>
        <div className="form-control">
          <label htmlFor="text">Text</label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text..."
          />
        </div>
        <div className="form-control">
          <label htmlFor="amount">Amount <br />(+ for income, - for expense)</label>
          <input
            type="text"
            value={amount}
            onChange={handleAmountChange}
            placeholder="Enter amount..."
          />
          <small>Enter amount with + for income and - for expense. Default is + if no sign is given. Commas are allowed for formatting but will be removed.</small>
        </div>
        <button className="btn">Add transaction</button>
      </form>
    </>
  );
};













    