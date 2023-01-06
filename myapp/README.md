# First Part

## Components Inside Components

On the `component` enclosed, the return will only be enclosed in the tags of the parent component.

```js
return <Card>some extra JSX</Card>;
```

In the `parent component`, use `props.children` to accept JSX in between. Also handle children classes.

```js
const Card = (props) => {
  const classes = `card ${props.className}`;
  return <div className={classes}>{props.children}</div>;
};
```

## Lifting State Up

Is a way of communication and state passing from where it is created to where it is needed. A function is passed as a pointer to the child as a prop which will be invoked while passing in the data as a parameter, handled by `useState` hook in the parent, or the component in need of it.
Example:

- On the needing component

```js
const Expenses = () => {
  const [filteredYear, setFilteredYear] = useState('2020');

  const filterChangeHandler = (selectedYear) => {
    setFilteredYear(selectedYear);
  };

  return (
    <ExpensesFilter
      selected={filteredYear}
      onFilterChange={filterChangeHandler}
    />
  );
};
```

- On the state producing component

```js
const ExpensesFilter = (props) => {
  const yearChangeHandler = (e) => {
    props.onFilterChange(e.target.value);
  };

  return (
    <div>
      <div>
        <label>Filter by year</label>
        <select value={props.selected} onChange={yearChangeHandler}>
          <option value='2022'>2022</option>
          <option value='2021'>2021</option>
          <option value='2020'>2020</option>
          <option value='2019'>2019</option>
        </select>
      </div>
    </div>
  );
};
```
