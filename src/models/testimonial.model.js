import mongoose, { Schema } from "mongoose";


const testimonialSchema = new Schema({
    client: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: true
    }

}, { timestamps: true })

export const Testimonial = mongoose.model("Testimonial", testimonialSchema)