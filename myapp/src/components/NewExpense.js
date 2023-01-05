import React from 'react';
import ExpenseForm from './ExpenseForm';

const NewExpense = (props) => {
  const inputExpenseHandler = (inputExpenseData) => {
    const expenseData = {
      ...inputExpenseData,
      id: Date.now(),
    };

    props.onSaveExpense(expenseData);
  };
  return (
    <div className='new-expense'>
      <ExpenseForm onInputExpenseSubmit={inputExpenseHandler} />
    </div>
  );
};

export default NewExpense;
