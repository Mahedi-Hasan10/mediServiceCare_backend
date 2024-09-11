import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const productValidate = asyncHandler(async (req, res, next) => {
    try {
        const files = req?.files?.image?.map((file) => file?.path)
        const { product_name, product_description, price, stock } = req.body
        if (!product_name || !product_description || !price || !stock) {
            throw new ApiError(400, "All Fields are required")
        }
        if (files?.length === 0 || !files?.length) {
            throw new ApiError(400, "Image is required!")
        }
        next()
    } catch (error) {
        throw new ApiError(400, error?.message || "Invalid Request")
    }
})

export { productValidate }