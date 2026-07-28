import express from "express";

import {
  getMyJourneys,
  getJourneyById,
  createJourney,
  deleteJourney,
  toggleJourneyPlace,
} from "../controllers/journey.controller.js";

import {protect} from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", protect, getMyJourneys);

router.get("/:id", protect, getJourneyById);

router.post("/", protect, createJourney);

router.delete("/:id", protect, deleteJourney);

router.patch(
  "/:journeyId/places/:heritageId",
  protect,
  toggleJourneyPlace
);

export default router;