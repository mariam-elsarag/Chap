import React from "react";

import ErrorMessage from "./ErrorMessage";

const Input = ({
  label,
  id,
  value: inputValue,
  type,
  placeholder,
  error,
  handleChange,
  disabled = false,
}) => {
  return (
    <fieldset className="grid gap-2">
      <label htmlFor={id} className={`flex label  capitalize`}>
        {label}
      </label>

      <input
        type={type}
        value={inputValue || ""}
        placeholder={placeholder}
        disabled={disabled}
        onChange={handleChange}
        className={` input  center_y gap-3  ${
          error ? "border-error" : ""
        } flex-1 `}
        min={0}
      />
      {error && <ErrorMessage message={error} />}
    </fieldset>
  );
};

export default Input;
