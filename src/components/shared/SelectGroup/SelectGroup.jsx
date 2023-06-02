import React from "react";

const SelectGroup = ({
  label,
  name,
  onChange,
  errors,
  customError,
  type,
  className,
  placeholder,
  options,
  loading = false,
  valueText = "value",
  titleText = "name",
  defaultValue,
  hasInitial = true,
  disabled = false,
  generateTitleText,
  generateValueText,
  style,
  ...rest
}) => {
  return (
    <div className="mb-2">
      {label && (
        <label htmlFor={label} className="form-label">
          {label}
        </label>
      )}
      <select
        name={name}
        onChange={onChange}
        className={`form-select ${loading && "loading"}  ${
          ((errors && errors[name]) || customError) && "is-invalid"
        } ${className}`}
        id={label}
        {...rest}
        defaultValue={defaultValue}
        disabled={disabled}
        style={style}>
        {hasInitial && <option value="">{placeholder}</option>}
        {options.map((op) => (
          <option
            key={generateValueText?.(op) ?? op[valueText]}
            value={generateValueText?.(op) ?? op[valueText]}>
            {generateTitleText?.(op) ?? op[titleText]}
          </option>
        ))}
      </select>
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

export default SelectGroup;
