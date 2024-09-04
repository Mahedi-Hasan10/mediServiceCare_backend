import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Testimonial } from "../models/testimonial.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const createTestimonials = asyncHandler(async (req, res) => {
    const { client, designation, message } = req.body
    if (!client && !designation && !message) throw new ApiError(400, "All fields are required!")
    const avatarLocalPath = req.file?.path;
    let avatar;
    if (avatarLocalPath) {
        avatar = await uploadOnCloudinary(avatarLocalPath)
    }
    if (!avatar) throw new ApiError(500, "Server Error")

    const testimonial = await Testimonial.create({
        client,
        designation,
        message,
        avatar: avatar?.url
    })

    if (!testimonial) throw new ApiError(400, "Error in creating testimonial")

    return res.status(200)
        .json(new ApiResponse(200, testimonial, "Testimonial Created Successfully"))
})

export { createTestimonials }