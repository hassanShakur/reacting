## useEffect

Is a hook whose code reruns whenever some defined valiables (`elements`) change. It's used to manage side effects of the app like `HTTP Rrequests` and other none UI related activities that may otherwise cause infinite app rerendering.

It takes in 2 parameters, a callback func with code to run and an array of dependencies that the code is rerun whenever they change.

Example during a login:

```js
import { useEffect } from 'react';

useEffect(() => {
  setFormIsValid(
    enteredPassword.trim().length > 4 && enteredEmail.includes('@')
  );
}, [enteredEmail, enteredPassword]);
```

The `setFormIsValid` func will only run if the password or email changes.

Without a `dependancy` item, the effect is rerun on every rerendering that happens. If the list is empty, it will run only once on app loading.

### Cleanup Function

For data fetching for eg, it would be redundant to request data on every keystroke thus a `timeout` function is normally used to send requests only after some period. These timeouts need to be removed the next time the useEffect is triggered.
Thus a useEffect can return a special func that cleans up the previous state and timeouts making it efficient.

```js
useEffect(() => {
  const timeout = setTimeout(() => {
    console.log('checking');
    setFormIsValid(
      enteredPassword.trim().length > 4 && enteredEmail.includes('@')
    );
  }, 500);

  return () => {
    clearTimeout(timeout);
    console.log('CLEAN');
  };
}, [enteredEmail, enteredPassword]);
```

The cleanup is always called before the useEffect executes except the first time. Upon several consecutive keystrokes, `cheking` is seen only after 500ms while `CLEAN` after every keystroke.

## useReducer Hook

Is a more poerfull state handler than useState used in managing closely related or dependent states. Syntax is:
`const [state, dispatchFn] = useReducer(reducerFn, initState, initFn);`
The `dispatchFn` dispatches a new action that triggers state update by the `reducerFn`, which tates in the `prevState` and the `action` and return a new state. The `initFn` can set the `initState` programmatically if it's complex.
