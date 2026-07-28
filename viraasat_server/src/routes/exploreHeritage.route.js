import express from "express";
import { getHeritages ,getHeritageBySlug} from "../controllers/exploreHeritage.controller.js";

const router = express.Router();

router.get("/", getHeritages);

router.get("/:slug", getHeritageBySlug);

export default router;
