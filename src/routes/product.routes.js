import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { allProducts, createProduct, deleteProduct, updateProduct } from "../controllers/product.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { productValidate } from "../middlewares/product.middleware.js";

const router = Router()

router.route("/").post(upload.fields([
    {

        name: "image",
        maxCount: 6,
    },

]), productValidate, verifyJWT, createProduct)
    .get(allProducts)

router.route("/:id").delete(verifyJWT, deleteProduct)
router.route("/:id").patch(upload.fields([
    {
        name: "image",
        maxCount: 6,
    },

]), verifyJWT, updateProduct)
export default router;
