import React from 'react';
import ExpenseDate from './ExpenseDate';


const SingleExpense = (props) => {
  return (
    <div className='expense-item'>
      <ExpenseDate data={props.data} />
      <div className='expense-item__description'>
        <h2>{props.data.title}</h2>
        <div className='expense-item__price'>${props.data.amount}</div>
      </div>
    </div>
  );
};

export default SingleExpense;
