import React from 'react';
import SingleExpense from './SingleExpense';

const Expenses = ({data}) => {
  return (
    <div className='expenses'>
      <SingleExpense data={data[0]}/>
      <SingleExpense data={data[1]}/>
      <SingleExpense data={data[2]}/>
      <SingleExpense data={data[3]}/>
    </div>
  );
};

export default Expenses;
