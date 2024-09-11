import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    //upload the file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    // file has been uploaded successfull
    console.log("file is uploaded on cloudinary ", response.url);
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath); // remove the locally saved temporary file as the upload operation got failed
    return null;
  }
};
const removeFromCloudinary = async (fileUrl, resource_type = "image") => {
  try {
    if (!fileUrl) throw new Error("File URL is required");

    // Extract the public ID from the URL
    const publicId = fileUrl.split("/").pop().split(".")[0];
    // Remove file from Cloudinary
    const result = await cloudinary.api.delete_resources([publicId], {
      type: "upload",
      resource_type: resource_type,
    });

    if (result.deleted[publicId] === "not_found") {
      throw new Error("File not found on Cloudinary");
    }

    console.log("File successfully deleted from Cloudinary:", result);
    return result;
  } catch (error) {
    console.error("Error removing from Cloudinary:", error.message || error);
    return null;
  }
};

const uploadMultipleFilesOnCloudinary = async (filePathsArray) => {
  try {
    if (!Array.isArray(filePathsArray) || filePathsArray.length === 0)
      return null;

    const uploadPromises = filePathsArray.map((filePath) =>
      uploadOnCloudinary(filePath)
    );

    const results = await Promise.all(uploadPromises);

    console.log("All files uploaded on Cloudinary:", results);
    return results;
  } catch (error) {
    console.error("Error uploading multiple files:", error.message || error);
    return null;
  }
};
export { uploadOnCloudinary, removeFromCloudinary, uploadMultipleFilesOnCloudinary };
