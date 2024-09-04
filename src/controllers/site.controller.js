import { SiteSetting } from "../models/siteSettings.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const postSiteSetting = asyncHandler(async (req, res) => {
  const {
    siteName,
    description,
    location1,
    location2,
    siteMail,
    copyRight,
    facebook,
    twitter,
    linkedIn,
    instagram,
    _id,
  } = req.body;
  const logoLocalPath = req.file?.path;

  if (!req.user._id) throw new ApiError(404, "Unauthorized request!");

  if (!siteName || !description) {
    throw new ApiError(400, "Site name and description are required.");
  }

  let logo;
  if (logoLocalPath) {
    logo = await uploadOnCloudinary(logoLocalPath);
  }

  let site;
  if (_id) {
    site = await SiteSetting.findByIdAndUpdate(
      _id,
      {
        $set: {
          siteName,
          description,
          location1,
          location2,
          siteMail,
          copyRight,
          facebook,
          twitter,
          linkedIn,
          instagram,
          ...(logo && { logo: logo.url }),
        },
      },
      { new: true }
    );

    if (!site) {
      throw new ApiError(404, "SiteSetting not found.");
    }
  } else {
    site = await SiteSetting.create({
      siteName,
      description,
      location1,
      location2,
      siteMail,
      copyRight,
      facebook,
      twitter,
      linkedIn,
      instagram,
      ...(logo && { logo: logo.url }),
    });
  }

  res.status(200).json(new ApiResponse(200, "Successfully updated", site));
});

const getSiteSetting = asyncHandler(async (req, res) => {




})

export { postSiteSetting };
