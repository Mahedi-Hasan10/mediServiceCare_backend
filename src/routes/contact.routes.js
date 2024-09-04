import { Router } from "express";
import { createContact, delContact, getAllContact } from "../controllers/contact.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/").post(createContact).get(verifyJWT, getAllContact)
router.route("/:id").delete(verifyJWT, delContact)

export default router;
