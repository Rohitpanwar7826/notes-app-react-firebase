import React from "react";

const Alert = ({ msg }) => {
  return (
    <div class="alert alert-danger">
      <strong>Error!</strong> {msg}.
    </div>
  );
};

export default Alert;
