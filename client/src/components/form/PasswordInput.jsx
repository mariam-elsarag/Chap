import React, { useState } from "react";

import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { Link } from "react-router-dom";
import ErrorMessage from "./ErrorMessage";

const PasswordInput = ({
  label,
  id,
  value,
  handleChange,
  placeholder,
  error,
  disabled,
  showForgetPassword = true,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="grid gap-3">
      <label htmlFor={id} className="auth_label">
        {label}
      </label>
      <div className="grid gap-2">
        <div className="w-full relative ">
          <input
            type={showPassword ? "text" : "password"}
            id={id}
            value={value}
            onChange={handleChange}
            disabled={disabled}
            className={` w-full input ${
              error ? "border-error" : ""
            }  pr-14 pl-4 `}
            placeholder={placeholder}
          />
          <span
            onClick={() => setShowPassword((pre) => !pre)}
            className={`absolute top-[50%] translate-y-[-50%] right-5 cursor-pointer`}
            role="button"
          >
            {!showPassword ? <VscEye /> : <VscEyeClosed />}
          </span>
        </div>
        <div
          className={`flex items-center w-full ${
            !showForgetPassword
              ? "justify-start"
              : error
              ? "justify-between"
              : "justify-end"
          }`}
        >
          {error && <ErrorMessage message={error} />}
          {showForgetPassword && (
            <Link
              className="text-text-1 underline underline-offset-2 text-sm decoration-white "
              to="/forget-password"
            >
              Forgot Password
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default PasswordInput;
