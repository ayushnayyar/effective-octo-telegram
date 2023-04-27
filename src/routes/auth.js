import express from "express";

import signIn from "../controllers/auth/sign_in.js";
import signUp from "../controllers/auth/sign_up.js";

const router = express.Router();

router.post("/signin", signIn);

router.post("/signup", signUp);

export default router;
