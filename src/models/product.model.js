import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
    {
        product_name: {
            type: String,
            required: true
        },
        product_description: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            default: 0
        },
        stock: {
            type: Number,
            default: 0
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        images: [
            {
                type: String,
                required: true
            }
        ],
        comments: [
            {
                type: Schema.Types.ObjectId,
                ref: "Comment"
            }
        ]
    },
    { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);
