import { useState } from 'react';
import React from 'react';

const ExpenseForm = (props) => {
  // UseStates
  const [enteredTitle, setEnteredTitle] = useState('');
  const [enteredPrice, setEnteredPrice] = useState('');
  const [enteredDate, setEnteredDate] = useState('');

  // onChange Handlers
  const titleChangeHandler = (e) => {
    setEnteredTitle(e.target.value);
  };
  const priceChangeHandler = (e) => {
    setEnteredPrice(e.target.value);
  };
  const dateChangeHandler = (e) => {
    setEnteredDate(e.target.value);
  };

  // Form submission
  const formSubmitHandler = (e) => {
    e.preventDefault();
    const enteredData = {
      title: enteredTitle,
      price: enteredPrice,
      date: enteredDate,
    };
    props.onInputExpenseSubmit(enteredData)
    
  };
  return (
    <form onSubmit={formSubmitHandler}>
      <div className='new-expense__controls'>
        <div className='new-expense__control'>
          <label htmlFor='title'>Title</label>
          <input type='text' onChange={titleChangeHandler} />
        </div>
        <div className='new-expense__control'>
          <label htmlFor='price'>Price</label>
          <input
            type='number'
            min='0.01'
            step='0.01'
            onChange={priceChangeHandler}
          />
        </div>
        <div className='new-expense__control'>
          <label htmlFor='date'>Date</label>
          <input
            type='date'
            min='2020-01-01'
            max='2022-12-31'
            onChange={dateChangeHandler}
          />
        </div>
      </div>
      <div className='new-expense__actions'>
        <button type='submit'>Add Expense</button>
      </div>
    </form>
  );
};

export default ExpenseForm;
