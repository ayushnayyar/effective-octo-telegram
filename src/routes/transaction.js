import express from "express";

import auth from "../middleware/auth.js";
import setPopulate from "../middleware/set_populate.js";
import transactionOwnerCheck from "../middleware/transaction_owner_check.js";

import createOne from "../controllers/transaction/create_one.js";
import getAll from "../controllers/transaction/get_all.js";
import getById from "../controllers/transaction/get_by_id.js";
import updateOne from "../controllers/transaction/update_one.js";
import deleteOne from "../controllers/transaction/delete_one.js";

import { populateType } from "../common/variables.js";

const router = express.Router();

// Create a new transaction
router.post("/", auth, createOne);

// Retrieve all transactions for the authenticated user
router.get(
  "/",
  setPopulate({ populationType: populateType.transaction }),
  auth,
  getAll
);

// Retrieve a specific transaction by ID
router.get("/:id", auth, transactionOwnerCheck, getById);

// Update a transaction by ID
router.put("/:id", auth, transactionOwnerCheck, updateOne);

// Delete a transaction by ID
router.delete("/:id", auth, transactionOwnerCheck, deleteOne);

export default router;
