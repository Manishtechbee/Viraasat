import express from "express";

import {
  translateMissingTexts,
} from "../controllers/autoTranslation.controller.js";

const router = express.Router();

router.post(
  "/translate",
  translateMissingTexts
);

export default router;