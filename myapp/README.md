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
