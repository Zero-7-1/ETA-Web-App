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

export const Balance = () => {
  const { transactions } = useContext(GlobalContext);

  const amounts = transactions.map(transaction => transaction.amount);

  const total = amounts.reduce((acc, item) => acc + item, 0);

  return (
    <>
      <h4>Your Balance</h4>
      <h1>{moneyFormatter(total)}</h1>
    </>
  );
};


