import React, { useState } from 'react';
import './styles/App.css';
import Expenses from './components/Expenses';
import NewExpense from './components/NewExpense';

const startExpenses = [
  {
    id: 'e1',
    title: 'Toilet Paper',
    price: 94.12,
    date: new Date(2021, 7, 14),
  },
  { id: 'e2', title: 'New TV', price: 799.49, date: new Date(2021, 2, 12) },
  {
    id: 'e3',
    title: 'Car Insurance',
    price: 294.67,
    date: new Date(2020, 4, 28),
  },
  {
    id: 'e4',
    title: 'New Desk (Wooden)',
    price: 450,
    date: new Date(2020, 5, 12),
  },
  {
    id: 'e5',
    title: 'Components',
    price: 294.12,
    date: new Date(2021, 11, 14),
  },
  { id: 'e6', title: 'States', price: 599.49, date: new Date(2021, 2, 12) },
  {
    id: 'e7',
    title: 'Hooks',
    price: 304.67,
    date: new Date(2021, 1, 28),
  },
  {
    id: 'e8',
    title: 'Component Books',
    price: 400.8,
    date: new Date(2020, 9, 12),
  },
];

function App() {
  const [expenses, setExpenses] = useState(startExpenses);

  const handleNewExpense = (expense) => {
    setExpenses((prevExpenses) => [expense, ...prevExpenses]);
  };

  return (
    <div>
      <NewExpense onSaveExpense={handleNewExpense} />
      <Expenses data={expenses} />
    </div>
  );
}

export default App;
