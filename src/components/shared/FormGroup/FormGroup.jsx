import React from "react";

const FormGroup = ({
  label,
  name,
  onChange,
  errors,
  customError,
  type,
  className,
  defaultValue,
  ...rest
}) => {
  return (
    <div className="mb-2">
      {label && (
        <label htmlFor={label} className="form-label">
          {label}
        </label>
      )}
      <input
        type={type}
        name={name}
        onChange={onChange}
        defaultValue={defaultValue}
        className={`form-control  ${
          ((errors && errors[name]) || customError) && "is-invalid"
        } ${className}`}
        id={label}
        {...rest}
      />
      {customError && (
        <small className="text-danger small error-message">{customError}</small>
      )}
      {errors && errors[name] && !customError && (
        <small className="text-danger small error-message">
          {errors[name]}
        </small>
      )}
    </div>
  );
};

export default FormGroup;
