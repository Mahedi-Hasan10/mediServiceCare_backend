import { Router } from "express";
import { allTestimonial, createTestimonials, deleteTestimonials, updateTestimonial } from "../controllers/testimonial.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router()

router.route("/").post(verifyJWT, upload.single("avatar"), createTestimonials).get(verifyJWT, allTestimonial)
router.route("/:id").delete(verifyJWT, deleteTestimonials).patch(verifyJWT, upload.single("avatar"), updateTestimonial)
export default router