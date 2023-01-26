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

```html
<span dangerouslySetInnerHTML={{__html: 'some text with html in it'}}></span>
````