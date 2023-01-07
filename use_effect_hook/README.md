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
