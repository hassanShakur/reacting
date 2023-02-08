- [Reacting](#reacting)
  - [Contents](#contents)
    - [Portals](#portals)
    - [Memos in React](#memos-in-react)
    - [UseCallback Hook](#usecallback-hook)
    - [UseMemo Hook](#usememo-hook)
  - [React Router](#react-router)
    - [Nested Routes](#nested-routes)
    - [Redirects](#redirects)
    - [`useParams`](#useparams)
  - [Debouncing State](#debouncing-state)
    - [Linking](#linking)
      - [Induce HTML directly to react](#induce-html-directly-to-react)
  - [Redux](#redux)
    - [Reducers](#reducers)
    - [Combining Reducers in Redux](#combining-reducers-in-redux)
    - [MapStatesToProps Syntax](#mapstatestoprops-syntax)
    - [Action Component Binding](#action-component-binding)
    - [Main `index.js` File](#main-indexjs-file)
    - [Using Middlewares in Async Action Creators](#using-middlewares-in-async-action-creators)
    - [Reducer Rules](#reducer-rules)
  - [React Router](#react-router-1)
    - [Router Types](#router-types)

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

### Portals

```js
import React from 'react';
import ReactDOM from 'react-dom';

const OverlayModal = () => {
  return <div className='some-overlay'></div>;
};

const Portals = () => {
  const containerElement = document.getElementById('root-overlay');
  return (
    <div>
      {ReactDOM.createPortal(<OverlayModal />, containerElement)}
    </div>
  );
};

export default Portals;
```

### Memos in React

Sacrifices overhead for re-executing child components for checking for changes in props. Components with memo are only rerendered if their props change.

```js
import React from 'react';

// some component
const Component = (props) => {};

export default React.memo(Component);
```

### UseCallback Hook

Creates a reference to a function so it is not recognized as a new function whenever it is called. This prevents unnecessary rerendering as well eg when used with the `React.memo()`

```js
const someFunction = useCallback(() => {
  // Some functionality
}, [dependencyList]);
```

### UseMemo Hook

As `useCallback` memoizes functions, `useMemo` can memoize any other data in an application. It returns the valye to be memoized and memoization only happens again whenever a `dependency` value changes.

```js
import { useMemo } from 'react';

const SomeComponent = (props) => {
  const { items } = props;

  const sortedItems = useMemo(() => {
    return items.sort((a, b) => a - b);
  }, [items]);
};
```

## React Router

`Link` - Normal a link

```js
<Link to='/some-place'>Go to some place</Link>
```

`navLink` - Similar to `Link` but has a property `activeClassName` which receives a classname with styles to be used when the link is active.
`Route` - Route to take.

```js
<Route path='/home'>
  <Page />
</Route>
```

`BrowserRouter` - The kind of `Provider` placed at the highest level needed.
`Switch` - Prevents multiple pages rendering on the same screen as they both match the url. The first match wins.

```js
<Switch>
  <Route to='/some-place'>
    <Page />
  </Route>
  <Route to='/some-other-place'>
    <Page2 />
  </Route>
</Switch>
```

### Nested Routes

Are routes inside routes. The more specific the url the lore specific the contents will be. Eg visiting `/homepage` shows the home. Inside home one can have a route to a premium homepage setup, thus another route `/homepage/premium` will display all homepage plus `premium` content.

### Redirects

The `Redirect` component is used. The path specifies the path that of visited will redirect to the `to` in `Redirect`.

```js
<Path to='/' exact>
  <Redirect to='/home' />
</Path>
```

### `useParams`

Imported from `react-router-dom`. Gives access to dynamic router sections eg.

```js
// Somewhere in link
<Link to='/some-place/:someId'>
  <Page />
</Link>;

// Later
const params = useParams();
const paramVal = params.someId;
```

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

This function gets access to the component's own props through a second parameter after the `state` from the store.

```js
const mapStatesToProps = (state, ownProps) => {
  return { someName: state.propNameInStore === ownProps.name };
};
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
Using `async` `await` syntax won't work due to some `case` inside the function after `babel's` compilation to `es5` which at `case 0` returns a `request` made inside the action creator instead of returning the object itself with `type` and optional `payload`.

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

To access a state form the redux thunk, call the `getState()` referencing the state to fetch.

```js
const stateItem = getState().item;
```

### Reducer Rules

1. Return any value besids `undefined`.
2. Produce a `state` or data used in the app using only previous states and data from an action.
3. `Pure reducers` - Must not reach outside itself to determine what to return.
4. Not mutate the `state` argument. Actually you can, but this might result in the exact same state being returned causing a `re-render` not to happen resulting in some unprecedented behaviour. Make use of `lodash` if you may.

## React Router

`react-router-dom` can be used to manage in-app navigation with rendering different components based on the url `path`. Basic configuration is...

```js
// In App

import {BrowserRouter, Route} from 'react-router-dom'

// Later on

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Route path='/' exact component={Home} />
          <Route path='/about' exact component={About} />
        <div/>
      <BrowserRouter/>
    </div>
  )
}
```

`BrowserRouter` should have only one child.

In the nav, a `Link` is used in place of `a` tag which prevents its default page request upon clicking to enable single page app.

```js

import {Link} from 'react-router-dom'

// Later in component

<Link to='/about' >About Page </Link>
<Link to='/docs' >Documentation </Link>
```

### Router Types

There are `Browser`, `Hash` and `Memory` routers. Given navigation to `/dev` page, `BrowserRouter` will show url as `/dev`, `HashRouter` as `/#/dev` and `MemoryRouter` with nothing.

The default for any server when trying to access such urls is to respong with some `html` page and if path is not defined then a `404` error is sent back. As for the local react dev server, instead of this error, it sends back the `index.htlm` file as a response to any other link. This therefore means that for some cases on deployment, `BrowserRouter` may not always work eg in `github pages`.

Using `HashRouter` informs the server to ignore anything after the `#` symbol and thus respond with only the original domain which is mostly the `index.html`. This is thus much safer for deployment as the server will never struggle to decipher the route and always ignore the rest of the url leaving it to the client dev to handle.

`MemoryRouter` doesn't display any routes in the history during navigation.
