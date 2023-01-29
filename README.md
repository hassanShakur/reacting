# Reacting

Just react

## Contents

1. Components Basics

- Intro to components
- Lifting states up
- useState hook

2. Styling Components

- Styled components using tagged template lits.
- Css modules
- React portals
- React fragments
- Wrappers
- useRef hook

3. useEffect Hook

- Cleanup function
- useReducer hook

## Debouncing State

Handling the dependency issue in `useState` where both including and excluding a certain dependency causes an issue.

```js
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const test = () => {
  const [results, setResults] = useState([]);
  const [term, setTerm] = useState('initial');
  const [debouncedTerm, setDebouncedTerm] = useState('initial');

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedTerm(term);
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [term]);

  useEffect(() => {
    const search = async () => {
      const { data } = await axios.get(
        'https://en.wikipedia.org/w/api.php',
        {
          params: {
            action: 'query',
            list: 'search',
            origin: '*',
            format: 'json',
            srsearch: debouncedTerm,
          },
        }
      );

      setResults(data.query.search);
    };

    search();
  }, [debouncedTerm]);

  return <div>test</div>;
};

export default test;
```

A new state is introduced that is updated from the original state after every 1 sec if the original state doesn't change in this period due to the returned `cleanup` function.

```js
return () => {
  clearTimeout(timeoutId);
};
```

If the new state is updated, a request is triggered immediately by the secont `useState` which has this new state `debouncedTerm` in its dependency list.

### Linking

1. Changing URL without full apge reload

```js
window.history.pushState({}, '', '/somePage');
```

2. Create an event dynamically

```js
const eventName = new popStateEvent('someEventIdentifier');
window.dispatchEvevt(eventName);

// Later on when listening
window.addEventListener('someEventIdentifier', callbackFunc);
```

3. Restoring `ctrl + click` to open link in new tab

```js
if (e.metaKey || e.ctrlKey) {
  return; // ie do not preventDefault
}
```

#### Induce HTML directly to react

```js
<span
  dangerouslySetInnerHTML={{ __html: 'some text with html in it' }}
></span>
```

## Redux

### Reducers

They accept `states` contained in the `store` together with actions dispatched and return a particular pice of code based upon some conditions.

```js
const reducerFunc = (currState, action) => {
  if (action.type === 'SOME_ACTION_TYPE') {
    return { something or updated currState };
  }

  return currState
};
```

### Combining Reducers in Redux

All reducers are combined together so that any action dispatched will be sure to pass through each.

```js
// In the `reducers` folder

import { combineReducers } from 'redux';

const reducerOne = (currState, action) => {
  if (action.type === 'SOME_ACTION_TYPE') {
    return { something or updated currState };
  }

  return currState
};

export default combineReducers({
  name1: reducerOne,
  name2: reducerTwo,
});
```

### MapStatesToProps Syntax

```js
import { connect } from 'react-redux';

// Component
const ComponentName = (props) => {
  const neededProp = props.someName;
};

const mapStatesToProps = (state) => {
  return { someName: state.propNameInStore };
};

export default connect(mapStatesToProps)(ComponentName);
```

### Action Component Binding

To use an action in a component, it is included in the `export` so it can be used from the props of the component. Calling the function as a normal func inside the component will not work as `redux` wont have access to it in this way.

```js
import { someNamedAction } from './actions';

// Component
const ComponentName = (props) => {
  const neededProp = props.someName;
  const theActionFunction = props.actionFunc;
};

// mapStatesToProps
const mapStatesToProps = (state) => {
  return { someName: state.propNameInStore };
};

export default connect(mapStatesToProps, {
  actionFunc: someNamedAction,
})(ComponentName);
```

### Main `index.js` File

```js
import { createStore } from 'redux';
import { Povider } from 'react-redux';

import App from './components/App';
import reducers from './reducers';

// In rendering

<Provider store={createStore(reducers)}>
  <App />
</Provider>;
```

### Using Middlewares in Async Action Creators

Middlewares allow for `manuall` dispatch of actions after a certain response or resource has been acquired from some source or api. It makes sure that `redux` doesn't dispatch an action to reducers before th resource has arrived as it happens quite fast.
Using `async` `await` syntax won't work due to some `case` inside the function after `babel's` compilation to `es15` which at `case 0` returns a `request` made inside the action creator instead of returning the object itself with `type` and optional `payload`.

The used middleware below is `redux-thunk`. It is included during `store` creation.

```js
import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

const store = createStore(reducers, applyMiddleware(thunk))

// Later on

<Provider store={store}>
  <App />
</Provider>;
```

So with `thunk`, an action creator ca return either a `function` or a normal `action`. If a func, thunk will await the response and dispatch an action manually after it's done. As parameters, the returned func receiver `dispatch` & `getState` functions.

Now the action will carry this look...

```js

export const fetchData = () => async (dispatch, getState) => {
  const response = await axios.get(https://some URL...);

  dispatch({type: 'FETCH_DATA', payload: response})
}
```
