import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Testimonial } from "../models/testimonial.model.js";
import { removeFromCloudinary, uploadOnCloudinary } from "../utils/cloudinary.js";

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

const allTestimonial = asyncHandler(async (req, res) => {
    const data = await Testimonial.find()
    if (!data) throw new ApiError(400, "Server Error!")
    return res.status(200)
        .json(new ApiResponse(200, data, "Testimonial fetched successfully"))

})

const deleteTestimonials = asyncHandler(async (req, res) => {
    const { id } = req.params
    if (!id) throw new ApiError(400, "Testimonial Id is required!")
    const testimonial = await Testimonial.findById(id)
    if (!testimonial) throw new ApiError(400, "Testimonial Already Deleted!")
    if (testimonial.avatar) await removeFromCloudinary(testimonial.avatar, "image")
    await Testimonial.findByIdAndDelete(id)

    return res.status(200)
        .json(new ApiResponse(200, "Testimonial deleted Successfully"))
})

const updateTestimonial = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { client, designation, message } = req.body;

    if (!id) throw new ApiError(400, "Testimonial Id is required!");

    const testimonial = await Testimonial.findById(id);
    if (!testimonial) throw new ApiError(400, "Testimonial not found or already deleted!");

    const avatarLocalPath = req.file?.path;
    let avatar = testimonial.avatar;

    if (avatarLocalPath) {
        const newAvatar = await uploadOnCloudinary(avatarLocalPath);
        if (!newAvatar) throw new ApiError(500, "Error uploading avatar");
        avatar = newAvatar?.url;
    }

    testimonial.client = client || testimonial.client;
    testimonial.designation = designation || testimonial.designation;
    testimonial.message = message || testimonial.message;
    testimonial.avatar = avatar;

    await testimonial.save();

    return res.status(200).json(
        new ApiResponse(200, testimonial, "Testimonial updated successfully")
    );
});

export { createTestimonials, deleteTestimonials, allTestimonial, updateTestimonial }