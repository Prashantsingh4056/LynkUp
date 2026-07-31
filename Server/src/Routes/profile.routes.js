import express from "express"
import protect from "../MiddleWares/protect.middleware.js"
import { getProfileByUsername, getUserProfileData, saveProfile } from "../Controllers/profile.controller.js"
import upload from "../MiddleWares/multer.middleware.js";

const router = express.Router()

router.post("/", protect, upload.single("profileImage") , saveProfile);
router.get("/user-profile-data", protect , getUserProfileData);
router.get("/:username", getProfileByUsername);

export default router;

