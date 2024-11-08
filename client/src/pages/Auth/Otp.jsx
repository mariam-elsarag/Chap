import React, { useState } from "react";
import Form from "../../components/form/Form";
import { useForm } from "react-hook-form";
import Button from "../../components/Button";

const Otp = () => {
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
