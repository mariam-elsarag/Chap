import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/Auth/AuthContext";
import axiosInstance from "../../service/axiosInstance";
import { toast } from "react-toastify";
import Form from "../../components/form/Form";
import Button from "../../components/Button";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  // ___________________ use form ____________________
  const {
    control,
    setError,
    reset,
    formState: { errors, dirtyFields, isDirty },
    handleSubmit,
  } = useForm({
    defaultValues: { email: "", password: "" },
    mode: "onChange",
  });
  // ___________________ list ____________________
  const formList = [
    {
      id: 0,
      formType: "input",
      fieldName: "email",
      validator: {
        required: "Email is required",
        pattern: {
          value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          message: "Please enter a valid email, e.g., example@domain.com.",
        },
      },
      label: "email",
      placeholder: "email",
      type: "email",
    },
    {
      id: 1,
      formType: "password",
      fieldName: "password",
      validator: {
        required: "Password is required",
      },
      placeholder: "password",
      label: "password",
    },
  ];
  // ___________________ login ____________________

  const onsubmit = async (data) => {
    try {
      setLoading(true);
      const response = await axiosInstance.post("/api/auth/login", data);
      if (response?.status === 200) {
        login(response.data);

        navigate("/home", { replace: true });
        toast.success("Successfully loged in");
      }
    } catch (err) {
      if (err?.response?.data?.errors) {
        setError("email", {
          type: "manual",
          message: "Wrong credentials",
        });
        setError("password", {
          type: "manual",
          message: "Wrong credentials",
        });
        toast.error("Wrong credentials");
      }

      console.log("error", err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit(onsubmit)} className="grid gap-10">
      <h1 className="text-xl text-text-1 ">Login</h1>
      <div className="grid gap-4">
        <Form
          formList={formList}
          control={control}
          errors={errors}
          loading={loading}
        />
      </div>
      <footer className="grid gap-4">
        <Button loading={loading}>login</Button>
        <span className="text-text-1 text-sm center_y gap-1">
          Don't have an account?
          <Link to="/register" className="text-primary">
            Register
          </Link>
        </span>
      </footer>
    </form>
  );
};

export default Login;
