import React from "react";

const AlertMessage = props => {
  return (
    <div className={`alert alert-${props.type}`}>
      <h3>{props.title}</h3>
      {props.children}
    </div>
  );
};

export default AlertMessage;
