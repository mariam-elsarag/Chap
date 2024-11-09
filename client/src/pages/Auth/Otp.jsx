import React, { useEffect, useState } from "react";
import Form from "../../components/form/Form";
import { useForm } from "react-hook-form";
import Button from "../../components/Button";
import { useNavigate, useSearchParams } from "react-router-dom";
import axiosInstance from "../../service/axiosInstance";
import { toast } from "react-toastify";

const Otp = () => {
  const navigate = useNavigate();
  const [searchparam] = useSearchParams();
  const email = searchparam.get("email");
  const [loading, setLoading] = useState(false);
  // ___________________ use form ____________________
  const {
    control,
    setError,
    reset,
    formState: { errors, dirtyFields, isDirty },
    handleSubmit,
  } = useForm({
    defaultValues: { otp: "" },
    mode: "onChange",
  });
  // ___________________ list ____________________
  const formList = [
    {
      id: 0,
      formType: "input",
      fieldName: "otp",
      validator: {
        required: "Opt is required",
      },
      label: "Otp",
      placeholder: "123456",
      type: "text",
    },
  ];
  // ___________________ login ____________________

  const onsubmit = async (data) => {
    const sendData = { email: email, otp: data.otp };
    try {
      setLoading(true);
      const response = await axiosInstance.post("/api/auth/verify", sendData);
      if (response?.status === 200) {
        navigate(`/reset-password?email=${email}`, { replace: true });
      }
    } catch (err) {
      if (err?.response?.data?.errors) {
        toast.error("Invalid OTP");
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
      <div className="center_y flex-col  gap-2 !items-start">
        <h1 className="text-xl text-text-1">Otp</h1>
        <p>code will send to your email</p>
      </div>
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

export default Otp;
