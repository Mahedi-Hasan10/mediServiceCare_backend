import { Router } from "express";

import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  createService,
  deleteService,
  getServiceDetails,
  getServices,
  updateService,
} from "../controllers/service.controller.js";

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

router
  .route("/")
  .get(getServices)
  .post(
    upload.fields([
      {
        name: "image",
        maxCount: 1,
      },
    ]),
    verifyJWT,
    createService
  );

router
  .route("/:id")
  .patch(verifyJWT, upload.single("image"), updateService)
  .delete(verifyJWT, deleteService)
  .get(getServiceDetails)

export default router;
