import React from 'react';
import SingleExpense from './SingleExpense';

const ExpensesList = ({ expenses }) => {
  if (expenses.length < 1) {
    return <h4 className='expenses-list__no-item'>No expenses found</h4>;
  }

  return (
    <ul className='expenses-list'>
      {expenses.map((expense) => (
        <SingleExpense data={expense} key={expense.id} />
      ))}
    </ul>
  );
};

export default ExpensesList;
