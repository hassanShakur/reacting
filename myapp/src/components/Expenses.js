import React from 'react';
import ExpenseDate from './ExpenseDate';

const Expenses = (props) => {
  return (
    <div className='expenses'>
      <div className='expense-item'>
        <ExpenseDate items={props.items}/>
        <div className='expense-item__description'>
          <h2>{props.items[0].title}</h2>
          <div className='expense-item__price'>${props.items[0].amount}</div>
        </div>
      </div>
    </div>
  );
};

export default Expenses;
