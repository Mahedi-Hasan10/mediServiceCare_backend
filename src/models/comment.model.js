import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        comment: {
            type: String,
            required: true
        },
        replies: [
            {
                type: Schema.Types.ObjectId,
                ref: "Reply"
            }
        ],
        createdAt: {
            type: Date,
            default: Date.now
        }
    },
    { timestamps: true }
);

export const Comment = mongoose.model("Comment", commentSchema);
