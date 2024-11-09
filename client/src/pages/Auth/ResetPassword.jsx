import React, { useEffect, useState } from "react";
import Button from "../../components/Button";
import Form from "../../components/form/Form";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import axiosInstance from "../../service/axiosInstance";
import { toast } from "react-toastify";
const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchparam] = useSearchParams();
  const email = searchparam.get("email");
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
    defaultValues: { password: "" },
    mode: "onChange",
  });
  // ___________________ list ____________________
  const formList = [
    {
      id: 0,
      formType: "password",
      fieldName: "password",
      validator: {
        required: "Password is required",
      },
      placeholder: "password",
      label: "password",
      showForgetPassword: false,
    },
    {
      id: 1,
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
  ];
  // ___________________ submit ____________________
  const onsubmit = async (data) => {
    const sendData = { email: email, password: data.password };
    try {
      setLoading(true);
      const response = await axiosInstance.patch(
        "/api/auth/reset-password",
        sendData
      );
      if (response?.status === 200) {
        navigate(`/login`, { replace: true });
      }
    } catch (err) {
      if (
        err?.response?.data?.errors ||
        err?.response?.data?.errors?.lenght > 0
      ) {
        toast.error(err?.response?.data?.errors);
      }
      console.log("error", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (!email) {
      navigate("/login");
    }
  }, []);
  return (
    <form onSubmit={handleSubmit(onsubmit)} className="grid gap-10">
      <h1 className="text-xl text-text-1 ">New password</h1>
      <div className="grid gap-3">
        <Form
          formList={formList}
          control={control}
          errors={errors}
          loading={loading}
        />
      </div>
      <Button loading={loading}>Change password</Button>
    </form>
  );
};

export default ResetPassword;
