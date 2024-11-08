import React, { useState } from "react";
import Form from "../../components/form/Form";
import Button from "../../components/Button";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const Register = () => {
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
      fieldName: "new_password",
      validator: {
        required: "Password is required",
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
          const password = getValues("new_password");
          return value === password || "Passwords do not match";
        },
      },
      placeholder: "Confirm password",
      label: "Confirm password",
      showForgetPassword: false,
    },
  ];
  // ___________________ submit ____________________
  const onsubmit = async (data) => {
    // try {
    //   setLoading(true);
    //   const response = await axiosInstance.post("/login/", data);
    //   if (response?.status === 200) {
    //     login(response.data);
    //     navigate("/home", { replace: true });
    //     toast.success(t("successfullyLogin"));
    //   }
    // } catch (err) {
    //   if (err?.response?.data?.non_field_errors) {
    //     setError("email", {
    //       type: "manual",
    //       message: t("invalidCredentials"),
    //     });
    //     setError("password", {
    //       type: "manual",
    //       message: t("invalidCredentials"),
    //     });
    //     toast.error(t("invalidCredentials"));
    //   }
    //   if (err?.response?.data === "not verfied") {
    //     toast.error(t("notVerified"));
    //   }
    //   console.log("error", err);
    // } finally {
    //   setLoading(false);
    // }
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
