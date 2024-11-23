import React from "react";
import { Controller } from "react-hook-form";
import Input from "./Input";
import UploadImage from "./UploadImage";
import PasswordInput from "./PasswordInput";
import InputRadio from "./InputRadio";

const Form = ({ formList = [], control, setError, errors, loading }) => {
  const renderField = (item, field, error) => {
    switch (item.formType) {
      case "uploadImage":
        return (
          <div className="flex_center">
            <UploadImage
              error={error?.message || errors?.[item.fieldName]?.message}
              handleChange={(e) => field.onChange(e)}
              value={field.value}
              disabled={item?.disabled || loading}
            />
          </div>
        );

      case "input":
        return (
          <Input
            error={error?.message || errors?.[item.fieldName]?.message}
            handleChange={(e) => field.onChange(e)}
            value={field.value}
            disabled={item?.disabled || loading}
            label={item.label}
            placeholder={item.placeholder}
            type={item.type}
            id={item.id}
          />
        );

      case "password":
        return (
          <PasswordInput
            error={error?.message || errors?.[item.fieldName]?.message}
            handleChange={(e) => field.onChange(e)}
            value={field.value}
            disabled={item?.disabled || loading}
            label={item.label}
            placeholder={item.placeholder}
            id={item.id}
            showForgetPassword={item?.showForgetPassword}
          />
        );
      case "textarea":
        return (
          <Textarea
            error={error?.message || errors?.[item.fieldName]?.message}
            handleChange={(e) => field.onChange(e)}
            value={field.value}
            disabled={item?.disabled || loading}
            label={item.label}
            placeholder={item.placeholder}
            id={item.id}
          />
        );
      case "radio":
        return (
          <InputRadio
            error={error?.message || errors?.[item.fieldName]?.message}
            handleChange={(e) => field.onChange(item.value)}
            value={field.value}
            disabled={item?.disabled || loading}
            label={item.label}
            id={item.id}
            name={item.name}
          />
        );

      default:
        return null;
    }
  };

  return (
    <>
      {formList.map((item, index) => {
        const isGrouped = item.isGrouped && formList[index + 1];

        if (isGrouped) {
          return (
            <div
              key={index}
              className={`flex items-center gap-8 ${item?.groupStyle} `}
            >
              {[item, formList[index + 1]].map((fieldItem) => (
                <Controller
                  key={fieldItem.id}
                  name={fieldItem.fieldName}
                  control={control}
                  rules={fieldItem.validator}
                  render={({ field, fieldState: { error } }) =>
                    renderField(fieldItem, field, error)
                  }
                />
              ))}
            </div>
          );
        } else if (!item.isGrouped && !item?.groupWith) {
          return (
            <Controller
              key={item.id}
              name={item.fieldName}
              control={control}
              rules={item.validator}
              render={({ field, fieldState: { error } }) =>
                renderField(item, field, error)
              }
            />
          );
        }
        return null;
      })}
    </>
  );
};

export default Form;
