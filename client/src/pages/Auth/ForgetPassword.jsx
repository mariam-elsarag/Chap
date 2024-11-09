import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../../components/Button";
import Form from "../../components/form/Form";
import axiosInstance from "../../service/axiosInstance";
import { useNavigate } from "react-router-dom";
const ForgetPassword = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  // ___________________ use form ____________________
  const {
    control,
    setError,
    reset,
    formState: { errors, dirtyFields, isDirty },
    handleSubmit,
  } = useForm({
    defaultValues: { email: "" },
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
  ];
  // ___________________ login ____________________

  const onsubmit = async (data) => {
    try {
      setLoading(true);
      const response = await axiosInstance.post(
        "/api/auth/forget-password",
        data
      );
      if (response?.status === 200) {
        navigate(`/otp/?email=${data?.email}`);
      }
    } catch (err) {
      console.log("error", err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit(onsubmit)} className="grid gap-10">
      <h1 className="text-xl text-text-1 ">Forget password</h1>
      <div className="grid gap-4">
        <Form
          formList={formList}
          control={control}
          errors={errors}
          loading={loading}
        />
      </div>

      <Button loading={loading}>Next</Button>
    </form>
  );
};

export default ForgetPassword;
