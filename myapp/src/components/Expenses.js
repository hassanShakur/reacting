import React, { useState } from 'react';

import SingleExpense from './SingleExpense';
import Card from '../UI/Card';
import ExpensesFilter from './ExpenseFilter';

const Expenses = ({ data }) => {
  const [filteredYear, setFilteredYear] = useState('2020');

  const filterChangeHandler = (selectedYear) => {
    setFilteredYear(selectedYear);
  };

  return (
    <Card className='expenses'>
      <ExpensesFilter
        selected={filteredYear}
        onFilterChange={filterChangeHandler}
      />
      <SingleExpense data={data[0]} />
      <SingleExpense data={data[1]} />
      <SingleExpense data={data[2]} />
      <SingleExpense data={data[3]} />
    </Card>
  );
};

export default Expenses;
