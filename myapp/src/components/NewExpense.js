import React from 'react';
import ExpenseForm from './ExpenseForm';

const NewExpense = () => {
  const inputExpenseHandler = (inputExpenseData) => {
    const expenseData = {
      ...inputExpenseData,
      id: Date.now(),
    };
  };
  return (
    <div className='new-expense'>
      <ExpenseForm onInputExpenseSubmit={inputExpenseHandler} />
    </div>
  );
};

export default NewExpense;
