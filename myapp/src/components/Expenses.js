import React from 'react';

const Expenses = (props) => {
  return (
    <div className='expenses'>
      <div className='expense-item'>
        <div className='expense-date'>
          <div className='expense-date__month'>August</div>
          <div className='expense-date__year'>2020</div>
          <div className='expense-date__day'>14</div>
        </div>
        <div className='expense-item__description'>
          <h2>some item</h2>
          <div className='expense-item__price'>$300</div>
        </div>
      </div>
    </div>
  );
};

export default Expenses;
