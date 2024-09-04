import { Contact } from "../models/contact.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createContact = asyncHandler(async (req, res) => {
    const { name, email, message } = req.body;
    if (!name) throw new ApiError(400, "Name is required!")
    if (!email) throw new ApiError(400, "Email is required!")
    if (!message) throw new ApiError(400, "Message is required!")

    const contact = await Contact.create({
        name, email, message
    })
    if (!contact) return new ApiError(400, "Error in sending message")
    return res.status(200)
        .json(new ApiResponse(200, "Message sent successfuly"))
})

const getAllContact = asyncHandler(async (req, res) => {
    const contact = await Contact.find()
    if (!contact) throw new ApiError(400, "Error in fething contact")
    return res.status(200)
        .json(new ApiResponse(200, contact, "Contact fethed successfully!"))

})
const delContact = asyncHandler(async (req, res) => {
    const { id } = req.params
    if (!id) throw new ApiError(400, "Id is missing")
    const contact = await Contact.findById(id)
    if (!contact) throw new ApiError(400, "Contact not found")
    await Contact.findByIdAndDelete(id)
    return res.status(200)
        .json(new ApiResponse(200, "Contact deleted successfully!"))

})
export { createContact, getAllContact, delContact }