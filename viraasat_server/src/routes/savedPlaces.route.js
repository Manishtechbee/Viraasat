import express from "express";

import {
  getSavedPlaces,
  savePlace,
  removeSavedPlace,
} from "../controllers/savedPlaces.controller.js";
import { protect } from "../middlewares/auth.middleware.js";


const router = express.Router();

router.get("/", protect, getSavedPlaces);

router.post("/:heritageId", protect, savePlace);

router.delete("/:heritageId", protect, removeSavedPlace);

export default router;