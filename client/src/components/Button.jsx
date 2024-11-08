import React from "react";
import { Link } from "react-router-dom";
import Spinner from "../Ui/Spinner";

const Button = ({
  children,
  onClick,
  to,
  type = "primary",
  role = "submit",
  disabled,
  loading,
  className,
  target,
}) => {
  const base = `outline-none  w-full rounded-6 font-normal text-base center gap-2 input_h px-4 border-none`;
  const styles = {
    primary: `${base} bg-primary text-white`,
  };
  if (to)
    return (
      <Link to={to} target={target} className={`${styles[type]} ${className}`}>
        {children}
      </Link>
    );
  return (
    <button
      disabled={disabled || loading}
      onClick={onClick}
      type={role}
      className={`${styles[type]} ${className}`}
    >
      {children}
      {loading && (
        <Spinner
          className={`${type === "error" ? "!fill-error !w-4 !h-4" : ""}`}
        />
      )}
    </button>
  );
};
export default Button;
