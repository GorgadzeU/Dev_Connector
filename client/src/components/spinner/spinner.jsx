import React, { Fragment } from 'react';
import spinnerGif from '../../img/6.gif';

export const Spinner = () => {
  return (
    <Fragment>
      <img
        src={spinnerGif}
        style={{ width: '50px', margin: 'auto', display: 'block' }}
        alt='loading...'
      />
    </Fragment>
  );
};

export default Spinner;
