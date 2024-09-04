import mongoose, { Schema } from "mongoose";

const SiteSettingSchema = new Schema({
  siteName: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location1: {
    type: String,
  },
  location2: {
    type: String,
  },
  siteMail: {
    type: String,
  },
  copyRight: {
    type: String,
  },
  facebook: {
    type: String,
  },
  twitter: {
    type: String,
  },
  linkedIn: {
    type: String,
  },
  instagram: {
    type: String,
  },
});

export const SiteSetting = mongoose.model("SiteSetting", SiteSettingSchema);
