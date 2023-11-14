import express from "express";

import auth from "../middleware/auth.js";
import setPopulate from "../middleware/set_populate.js";
import accountOwnerCheck from "../middleware/account_owner_check.js";

import createOne from "../controllers/account/create_one.js";
import getAll from "../controllers/account/get_all.js";
import getById from "../controllers/account/get_by_id.js";
import updateOne from "../controllers/account/update_one.js";
import deleteOne from "../controllers/account/delete_one.js";

const router = express.Router();

// Create a new account
router.post("/", auth, createOne);

// Retrieve all accounts for the authenticated user
router.get("/", setPopulate, auth, getAll);

// Retrieve a specific account by ID
router.get("/:id", auth, accountOwnerCheck, getById);

// Update a account by ID
router.put("/:id", auth, accountOwnerCheck, updateOne);

// Delete a account by ID
router.delete("/:id", auth, accountOwnerCheck, deleteOne);

export default router;
