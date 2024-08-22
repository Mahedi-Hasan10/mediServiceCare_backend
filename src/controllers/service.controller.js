import { Service } from "../models/service.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const createService = asyncHandler(async (req, res) => {
  const { subTitle, title, description } = req.body;
  const imageLocalPath = req.files?.image[0]?.path;

  if (!imageLocalPath) throw new ApiError(400, "Image file is required");
  if (subTitle || title || description)
    throw new ApiError(400, "All fields are required!");
  if (!req.user?._id) throw new ApiError(400, "Unathorized Request!");

  const image = await uploadOnCloudinary(imageLocalPath);
  if (!image) {
    throw new ApiError(400, "Image file is required");
  }
  const service = await Service.create({
    subTitle,
    title,
    description,
    image: image.url,
  });

  if (!service) {
    throw new ApiError(500, "Something went wrong while creating service");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, service, "Service Created Successfully!"));
});
const getServices = asyncHandler(async (req, res) => {
  const services = Service.find();
  return res
    .status(200)
    .json(new ApiResponse(200, services, "Service fethed Successfully!"));
});
const getServiceDetails = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) throw new ApiError(400, "ID not  found");
  const service = Service.findById(id);
  return res
    .status(200)
    .json(new ApiResponse(200, service, "Service fethed Successfully!"));
});

export { createService, getServices, getServiceDetails };
