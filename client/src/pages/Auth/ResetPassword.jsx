import React, { useState } from "react";
import Button from "../../components/Button";
import Form from "../../components/form/Form";
import { useForm } from "react-hook-form";
const ResetPassword = () => {
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
      id: 1,
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
