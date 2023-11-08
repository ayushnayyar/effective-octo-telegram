import mongoose, { Schema } from "mongoose";

const categorySchema = new mongoose.Schema({
  name: String,
  description: String,
  owner: { type: Schema.Types.ObjectId, ref: "User" },
});

const Category = mongoose.model("Category", categorySchema);

export default Category;
