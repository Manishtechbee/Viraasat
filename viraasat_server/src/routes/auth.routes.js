import express from "express";
import { getMe, login, registerByMail, logout, googleCallback } from "../controllers/auth.controller.js";
import { loginValidator, registerValidator } from "../validators/auth.validator.js";
import validate from "../middlewares/validate.middleware.js";
import { protect } from "../middlewares/auth.middleware.js";
import passport from "passport";


const router = express.Router();

router.post(
  "/register",
  registerValidator,
  validate,
  registerByMail
);

router.post(
    "/login",
    loginValidator,
    validate,
    login
);

router.get("/me", protect, getMe);

router.post("/logout", protect, logout);


//Google Authentication
router.get(
    "/google",

    passport.authenticate("google", {
        scope: ["profile", "email"],
        session: false,
    })
);

router.get(

    "/google/callback",

    passport.authenticate("google", {
        session: false,
        failureRedirect: `${process.env.CLIENT_URL}/login`,
    }),

    googleCallback

);
export default router;