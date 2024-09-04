import { Router } from "express";
import { createTestimonials } from "../controllers/testimonial.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router()

router.route("/").post(verifyJWT, upload.single("avatar"), createTestimonials)
export default router