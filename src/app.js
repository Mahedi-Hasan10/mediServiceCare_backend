import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

//routes import
import userRouter from "./routes/user.routes.js";
import serviceRoute from "./routes/service.routes.js";
import contactRoute from "./routes/contact.routes.js";
import testimonialRoute from "./routes/testimonial.routes.js";
//routes declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/services", serviceRoute);
app.use("/api/v1/contact", contactRoute);
app.use("/api/v1/testimonial", testimonialRoute);

// http://localhost:8000/api/v1/users/register

export { app };
