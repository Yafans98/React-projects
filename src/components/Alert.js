import React from 'react';

function Alert(props) {
  const {type, text} = props;
  return (
    <div className={`alert alert-${type}`}>{text}</div>
  );
}

export default Alert;