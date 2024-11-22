import cloudinary from "../service/cloudinary.js";
import AppErrors from "./AppErrors.js";

const uploadImage = (fileBuffer, fieldName, next) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: "mediafiles/avatar" },
      (error, result) => {
        if (error) {
          return next(
            new AppErrors(
              [{ [fieldName]: `Failed to upload ${fieldName}` }],
              500
            )
          );
        }
        resolve(result.secure_url);
      }
    );

    uploadStream.end(fileBuffer);
  });
};

export default uploadImage;
