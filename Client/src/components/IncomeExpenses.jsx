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


export const IncomeExpenses = () => {
  const { transactions } = useContext(GlobalContext);

  const amounts = transactions.map(transaction => transaction.amount);

  const income = amounts
    .filter(item => item > 0)
    .reduce((acc, item) => acc + item, 0);

  const expense = (
    amounts.filter(item => item < 0).reduce((acc, item) => acc + item, 0) * -1
  );

  return (
    <div className="inc-exp-container">
      <div>
        <h4>Income</h4>
        <p className="money plus">{moneyFormatter(income)}</p>
      </div>
      <div>
        <h4>Expense</h4>
        <p className="money minus">{moneyFormatter(expense)}</p>
      </div>
    </div>
  );
};


