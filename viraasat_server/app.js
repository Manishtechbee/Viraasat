import "dotenv/config";

import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import authRoutes from "./src/routes/auth.routes.js";
import errorHandler from "./src/middlewares/error.middleware.js";
import session from "express-session";
import passport from "passport";
import "./src/config/passport.js";

import exploreHeritageRoutes from "./src/routes/exploreHeritage.route.js";
import savedPlacesRoutes from "./src/routes/savedPlaces.route.js";
import languageRoutes from "./src/routes/language.route.js";
import translationRoutes from "./src/routes/translation.route.js";
import journeyRoutes from "./src/routes/journey.route.js";
import autoTranslationRoutes from "./src/routes/autoTranslation.route.js";



const app = express()


app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.use(cookieParser())



//Google Authentication
app.use(passport.initialize());




//Auth Routes
app.use("/api/auth", authRoutes);

// Explore heritage routes
app.use("/api/exploreHeritages", exploreHeritageRoutes);


//saved places
app.use("/api/saved-places", savedPlacesRoutes);



//language
app.use("/api/languages", languageRoutes);
app.use("/api/i18n", translationRoutes);
app.use(
  "/api/i18n/auto",
  autoTranslationRoutes
);


//journey

app.use(
  "/api/journeys",
  journeyRoutes
);


//General Route
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Viraasat API Running"
    });
});



app.use(errorHandler)

export default app