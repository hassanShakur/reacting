import React from 'react';
import ExpenseDate from './ExpenseDate';
import Card from '../UI/Card';

const SingleExpense = (props) => {
  return (
    <Card className='expense-item'>
      <ExpenseDate data={props.data} />
      <div className='expense-item__description'>
        <h2>{props.data.title}</h2>
        <div className='expense-item__price'>${props.data.price}</div>
      </div>
    </Card>
  );
};

export default SingleExpense;
