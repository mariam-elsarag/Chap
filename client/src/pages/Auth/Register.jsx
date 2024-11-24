import React, { useState } from "react";
import Form from "../../components/form/Form";
import Button from "../../components/Button";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../service/axiosInstance";
const passwordPattern =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;
const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  // ___________________ use form ____________________
  const {
    control,
    setError,
    reset,
    getValues,
    formState: { errors, dirtyFields, isDirty },
    handleSubmit,
  } = useForm({
    defaultValues: {
      full_name: "",
      email: "",
      password: "",
      confirm_password: "",
      gender: "",
    },
    mode: "onChange",
  });
  // ___________________ list ____________________
  const formList = [
    {
      id: 1,
      formType: "input",
      fieldName: "full_name",
      validator: {
        required: "Full name is required",
      },
      label: "full name",
      placeholder: "Full name",
      type: "text",
    },
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
      id: 3,
      formType: "password",
      fieldName: "password",
      validator: {
        required: "Password is required",
        pattern: {
          value: passwordPattern,
          message: "Please enter a strong password",
        },
      },
      placeholder: "password",
      label: "password",
      showForgetPassword: false,
    },
    {
      id: 4,
      formType: "password",
      fieldName: "confirm_password",
      validator: {
        required: "Confirm password is required",
        validate: (value) => {
          const password = getValues("password");
          return value === password || "Passwords do not match";
        },
      },
      placeholder: "Confirm password",
      label: "Confirm password",
      showForgetPassword: false,
    },
    {
      id: 5,
      name: "gender",
      formType: "radio",
      fieldName: "gender",
      validator: {
        required: "gender is required",
      },
      label: "Male",
      value: "male",
      isGrouped: true,
    },
    {
      id: 6,
      name: "gender",
      formType: "radio",
      fieldName: "gender",
      validator: {
        required: "gender is required",
      },
      label: "Female",
      value: "female",
      groupWith: 5,
    },
  ];
  // ___________________ submit ____________________
  const onsubmit = async (data) => {
    try {
      setLoading(true);
      const response = await axiosInstance.post("/api/auth/register", data);
      if (response?.status === 201) {
        navigate("/login");
      }
    } catch (err) {
      if (err?.response?.data?.errors?.email) {
        setError("email", {
          type: "manual",
          message: "Email already exists",
        });
      }
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit(onsubmit)} className="grid gap-10">
      <h1 className="text-xl text-text-1 ">Register</h1>
      <div className="grid gap-3">
        <Form
          formList={formList}
          control={control}
          errors={errors}
          loading={loading}
        />
      </div>
      <footer className="grid gap-4">
        <Button loading={loading}>Register</Button>
        <span className="text-text-1 text-sm center_y gap-1">
          Already have an account?
          <Link to="/login" className="text-primary">
            login
          </Link>
        </span>
      </footer>
    </form>
  );
};

export default Register;
