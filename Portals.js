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
