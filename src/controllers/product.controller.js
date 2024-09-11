import { Product } from "../models/product.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadMultipleFilesOnCloudinary } from "../utils/cloudinary.js";

const createProduct = asyncHandler(async (req, res) => {
    const { product_name, product_description, price, stock } = req.body;
    if (!req.user) {
        throw new ApiError(404, "Unauthorized!");
    }
    const files = req?.files?.image?.map((file) => file?.path);
    if (files?.length > 5) throw new ApiError(400, "You can upload maximum 5 image")
    let uploadResults, imageUrls;
    if (files) {
        uploadResults = await uploadMultipleFilesOnCloudinary(files);
    }
    if (!uploadResults) throw new ApiError(400, "Error in uploading image");
    imageUrls = uploadResults?.map((file) => file.url);

    const product = await Product.create({
        product_name,
        product_description,
        price,
        stock,
        images: imageUrls,
    });

    if (!product) throw new ApiError(400, "Product Upload Failed");

    return res
        .status(200)
        .json(new ApiResponse(200, product, "Product Uploaded Successfully!"));
});

const allProducts = asyncHandler(async (req, res) => {
    const products = await Product.find()
    if (!products) throw new ApiError(404, "Failed to fetched product")
    return res.status(200)
        .json(new ApiResponse(200, products, "Product fetched Successfully!"))
})

const deleteProduct = asyncHandler(async (req, res) => {
    const { id } = req.params
    if (!id) throw new ApiError(400, "Product id not found")
    const product = await Product.findById(id)
    if (!product) throw new ApiError(400, "Product not found or already deleted")
    const pres = await Product.findByIdAndDelete(id)
    console.log("🚀 ~ deleteProduct ~ pres:", pres)
    return res.status(200)
        .json(new ApiResponse(200, "Product deleted Successfully!"))
})

const updateProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { product_name, product_description, price, stock, oldImages = [] } = req.body;
    if (!id) throw new ApiError(400, "Product ID is required!");
    let product = await Product.findById(id);
    if (!product) throw new ApiError(404, "Product not found!");
    const files = req?.files?.image?.map((file) => file?.path);
    if (files?.length > 5) throw new ApiError(400, "You can upload a maximum of 5 images.");

    let uploadResults, newImageUrls = [];

    if (files) {
        uploadResults = await uploadMultipleFilesOnCloudinary(files);
        if (!uploadResults) throw new ApiError(400, "Error in uploading new images.");
        newImageUrls = uploadResults?.map((file) => file.url);
    }

    const updatedImages = [...oldImages, ...newImageUrls];
    let newproduct = await Product.findByIdAndUpdate(
        id,
        {
            product_name,
            product_description,
            price,
            stock,
            images: updatedImages,
        },
        { new: true }
    );

    if (!newproduct) throw new ApiError(400, "Product update failed!");

    return res.status(200).json(new ApiResponse(200, newproduct, "Product updated successfully!"));
});

export { createProduct, allProducts, deleteProduct, updateProduct }