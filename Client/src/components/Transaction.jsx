import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

function moneyFormatter(num) {
  let sign = num < 0 ? '-' : '';
  num = Math.abs(num);
  let [whole, decimal] = num.toFixed(2).split('.');

  // Format the whole part with the Indian numbering system
  whole = whole.replace(/\B(?=(\d{2})+(?:(?!\d{3})*\d)(?!\d))/g, ',');

  return `${sign}₹ ${whole}.${decimal}`;
}


export const Transaction = ({ transaction }) => {
  const { deleteTransaction } = useContext(GlobalContext);

  const sign = transaction.amount < 0 ? '-' : '+';

  return (
    <li className={transaction.amount < 0 ? 'minus' : 'plus'}>
      {transaction.text} <span>{sign}{moneyFormatter(transaction.amount)}</span>
      <button onClick={() => deleteTransaction(transaction._id)} className="delete-btn">x</button>
    </li>
  );
};


