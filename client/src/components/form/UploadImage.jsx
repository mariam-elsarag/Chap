import React, { useEffect, useState } from "react";

import ErrorMessage from "./ErrorMessage";

const UploadImage = ({ handleChange, value, error, disabled }) => {
  const [img, setImg] = useState(value);
  const handleImageChange = (event) => {
    const image = event.target.files[0];
    setImg(URL.createObjectURL(image));
    handleChange(image);
  };
  useEffect(() => {
    if (typeof value === "string" || value === null) {
      setImg(value);
    }
  }, [value]);
  const removeImg = () => {
    setImg(null);
    handleChange(null);
  };
  return (
    <div className="grid gap-2 relative">
      <figure className="flex items-center relative flex-row-reverse shadow-main rounded-10 w-[140px] h-[207px]">
        <label
          role="button"
          htmlFor="uploadImg"
          className={`${
            img ? "" : "bg-primary-dark"
          } flex_center border border-primary-dark w-[140px] h-[207px] rounded-10`}
        >
          {/* {img ? (
            <img
              src={img}
              className="w-full h-full object-cover object-center rounded-10"
            />
          ) : (
            <img
              src={UploadImageIcon}
              alt="add image"
              className="w-[40px] h-[40px]"
            />
          )} */}
        </label>
      </figure>
      {error && <ErrorMessage message={error} />}
      <input
        type="file"
        id="uploadImg"
        className="hidden"
        accept=".jpg,.png,.jpeg"
        onChange={(e) => handleImageChange(e)}
        disabled={disabled}
      />
    </div>
  );
};

export default UploadImage;
