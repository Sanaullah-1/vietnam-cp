import React from "react";
import Camera from '../../../assets/icons/CAMERA-01.svg'
const UploadImage = ({
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
                <label htmlFor={label} className="form-label w-100">
                    <img src={Camera} alt className="w-100"/>
                    {/* <p>Add Photo</p> */}
                </label>
            )}
            <input
                type={type}
                name={name}
                onChange={onChange}
                defaultValue={defaultValue}
                className={`form-control  ${((errors && errors[name]) || customError) && "is-invalid"
                    } ${className}`}
                id={label}
                {...rest}
                hidden
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

export default UploadImage;
