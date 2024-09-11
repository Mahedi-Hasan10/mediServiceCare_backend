import { Service } from "../models/service.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { removeFromCloudinary, uploadOnCloudinary } from "../utils/cloudinary.js";

const createService = asyncHandler(async (req, res) => {
  const { subTitle, title, description } = req.body;
  const imageLocalPath = req.files?.image[0]?.path;

  if (!imageLocalPath) throw new ApiError(400, "Image file is required");
  if (!subTitle || !title || !description)
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
const updateService = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const { subTitle, title, description } = req.body;
  const imageLocalPath = req.files?.image[0]?.path;

  if (!req.user._id) throw new ApiError(400, "Unauthorized Request");
  if (!id) throw new ApiError(401, "Service Id Missing");

  const service = await Service.findById(id);
  if (!service) throw new ApiError(400, "Service Not Found!");

  let image;
  if (imageLocalPath) {
    image = await uploadOnCloudinary(imageLocalPath);
    if (!image?.url) {
      throw new ApiError(400, "Failed to upload image to Cloudinary");
    }
  }
  const updatedService = await Service.findByIdAndUpdate(
    id,
    {
      subTitle,
      title,
      description,
      ...(image && { image: image.url }),
    },
    { new: true }
  );
  if (!updatedService) throw new ApiError(400, "Error in updating service");
  return res
    .status(200)
    .json(new ApiResponse(200, updatedService, "Service Successfully updated"));
});

const getServices = asyncHandler(async (req, res) => {
  const services = await Service.find();
  return res
    .status(200)
    .json(new ApiResponse(200, services, "Services fetched successfully!"));
});

const getServiceDetails = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) throw new ApiError(400, "ID not  found");
  const service = await Service.findById(id);
  if (!service) throw new ApiError(400, "Service not found");
  return res
    .status(200)
    .json(new ApiResponse(200, service, "Service fethed Successfully!"));
});

const deleteService = asyncHandler(async (req, res) => {
  const id = req.params.id;
  if (!id) throw new ApiError(400, "Service Id Not Found!");
  if (!req.user._id) throw new ApiError(400, "Unauthorized request");
  const service = await Service.findById(id);
  if (service.image) {
    await removeFromCloudinary(service.image, 'image');
  }
  if (!service) throw new ApiError(401, "Service Not Found!");
  await Service.findByIdAndDelete(id);
  return res
    .status(200)
    .json(new ApiResponse(200, "Service deleted successfully"));
});

export {
  createService,
  getServices,
  getServiceDetails,
  updateService,
  deleteService,
};
