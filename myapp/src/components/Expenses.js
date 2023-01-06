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

      {data.map((expense) => (
        <SingleExpense data={expense} key={expense.id} />
      ))}
    </Card>
  );
};

export default Expenses;
