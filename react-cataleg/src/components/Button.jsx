import React, { memo } from 'react';

const Button = memo(function Button({ onClick, text} ) {
  return (
    <button className="button" onClick={onClick}>
      {text}
    </button>
  );
});

export default Button;
