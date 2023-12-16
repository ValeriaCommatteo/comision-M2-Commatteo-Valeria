import React from 'react';

export  function Button({ onClick, children }) {

    return (
      <button style={{ backgroundColor: '#210062' }} onClick={onClick} >{children} </button>
    );
}

