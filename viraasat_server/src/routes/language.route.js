import express from "express";
import { getLanguages } from "../controllers/language.controller.js";

const router = express.Router();

router.get("/", getLanguages);

export default router;