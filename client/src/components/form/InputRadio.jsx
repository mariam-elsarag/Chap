import React from "react";

const InputRadio = ({
  id,
  name,
  label,
  error,
  value,
  handleChange,
  disabled,
}) => {
  return (
    <fieldset className="flex items-center gap-2">
      <input
        id={id}
        type="radio"
        name={name}
        value={value}
        className={` w-[18px] h-[18px]  `}
        disabled={disabled}
        onChange={handleChange}
      />
      <label htmlFor={id} className={`label ${error ? "text-error" : ""}`}>
        {label}
      </label>
    </fieldset>
  );
};

export default InputRadio;
