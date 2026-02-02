import express from "express";
import {
    login,
    logout,
    register,
    updateProfile,
    getUser,
} from "../controllers/user.Controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";
import { singleUpload } from "../middleware/multer.js";

const router = express.Router();

router.post("/register", singleUpload, register);
router.post("/login", login);
router.post("/profile/update", isAuthenticated, singleUpload, updateProfile);
router.get("/logout", logout);
router.get("/me", isAuthenticated, getUser);

export default router;
