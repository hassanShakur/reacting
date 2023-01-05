import React from 'react';
import SingleExpense from './SingleExpense';
import Card from '../UI/Card';

const Expenses = ({data}) => {
  return (
    <Card className='expenses'>
      <SingleExpense data={data[0]}/>
      <SingleExpense data={data[1]}/>
      <SingleExpense data={data[2]}/>
      <SingleExpense data={data[3]}/>
    </Card>
  );
};

export default Expenses;
