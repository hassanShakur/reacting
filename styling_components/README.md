## Styled Components

- Start by `npm install --save styled-components`
- Then in js:

```js
import styled fron 'styled-components'
```

The concept is based on `tagged template literals` which starts with `styled.htmlTag` followed by template literals which contain all stylings. For `pseudo-selectors`, use the Scss style of `&` followed by the pseudo.

```js
const StyledDiv = styled.div`
  // Some css without selectors
  color: red;

  &:hover {
  }
`;
```

Props can be passed to the element as well. To use the props to affect a property, set up a callback func at that property that takes in props as a parameter and return the desired value based on input prop.

```js
const StyledDiv = styled.div`
  // Some css without selectors
  color: ${(props) => (props.validity ? '#000' : 'red')};

  &:hover {
  }
`;

const BaseFile = () => {
  return <StyledDiv validity={isValid} />;
};
```

## CSS Modules

Styling files are kept separate from the js but named different as they end with `.module.css`. On importing, they are imported as `styles`, or any name you like from the module which makes all selectors in the CSS properties of styles.

```js
import styles from './styling.module.css';

const BaseFile = () => {
  // Where .submitButton is a class selector in the css
  return <button style={styles.submitButton} />;
};
```

## useRef Hook

Best for reading values from the dom. Always returns an object. Like a reference to it

```js
import { useRef } from 'react';

const nameInputRef = useRef();

// Later in the return statement

return <input ref={nameInputRef} />;

// After this, the nameInputRef will always hold the value of the input and to access it

const enteredName = nameInputRef.current.value;
```

It can also be used to edit the current input value.
