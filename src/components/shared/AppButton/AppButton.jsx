import React from "react";

const AppButton = ({
  className,
  onClick,
  disabled,
  loading,
  children,
  type,
  ...rest
}) => {
  return (
    <button
      className={className}
      onClick={onClick}
      disabled={loading || disabled}
      type={type}
      {...rest}
    >
      {loading ? (
        <div className="d-flex align-items-center justify-content-center">
          <span
            className="spinner-border spinner-border-sm align-middle me-2"
            role="status"
            aria-hidden="true"
          ></span>
          <span> {children}</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default AppButton;
