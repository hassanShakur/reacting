import React from 'react';
import ReactDOM from 'react-dom';

// Creating component
// Component tenets : Nesting, Reusability & Configuration

const App = () => {
  return <div style={{color: 'red'}}>Hello there</div>;
};

// Rendering the component
ReactDOM.render(<App />, document.querySelector('#root'));
