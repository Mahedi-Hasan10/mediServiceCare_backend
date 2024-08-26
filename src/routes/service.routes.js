import { Router } from "express";

import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createService, getServices } from "../controllers/service.controller.js";

const router = Router();

// router.route("/").post(
//   upload.fields([
//     {
//       name: "avatar",
//       maxCount: 1,
//     },
//     {
//       name: "coverImage",
//       maxCount: 1,
//     },
//   ]),
//   registerUser
// );

router.route("/").get(getServices)
.post(upload.fields([
    {
      name: "image",
      maxCount: 1,
    }
]), createService);

export default router;
