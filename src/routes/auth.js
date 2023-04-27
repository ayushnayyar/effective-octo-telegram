import express from "express";

import auth from "../middleware/auth.js";

import signIn from "../controllers/auth/sign_in.js";
import signUp from "../controllers/auth/sign_up.js";
import signOut from "../controllers/auth/sign_out.js";

const router = express.Router();

router.post("/signin", signIn);

router.post("/signup", signUp);

router.post("/signout", auth, signOut);

export default router;
