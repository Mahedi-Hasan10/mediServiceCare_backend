import mongoose, { Schema } from "mongoose";

const serviceSchema = new Schema(
  {
    image: {
      type: String,
      required: true,
    },
    subTitle: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Service = mongoose.model("Service", serviceSchema);
