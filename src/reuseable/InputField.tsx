import React from "react";
import Form from "react-bootstrap/Form";

const InputField = ({ ...rest }) => {
  const {
    type,
    label,
    placeholder,
    value,
    controlId,
    errors,
    onChange,
    isValid,
    isInvalid,
    name,
  } = rest;
  return (
    <div>
      <Form.Group className="mb-3" controlId={controlId}>
        <Form.Label>{label}</Form.Label>
        <Form.Control
          name={name}
          onChange={onChange}
          isValid={isValid}
          isInvalid={isInvalid}
          value={value}
          type={type}
          placeholder={placeholder}
        />
        <Form.Control.Feedback type="invalid">{errors}</Form.Control.Feedback>
      </Form.Group>
    </div>
  );
};

export default InputField;
