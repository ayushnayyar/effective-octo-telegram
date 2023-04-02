import mongoose from "mongoose";

const recipeSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true, unique: true },
    ingredients: [
      {
        ingredient: { type: Schemia.Types.ObjectId, ref: "Ingredient" },
        quantity: { type: Number },
      },
    ],
    preparation_steps: [
      {
        step: {
          type: Number,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
        ingredients: [
          {
            type: Schema.Types.ObjectId,
            ref: "Ingredient",
          },
        ],
      },
    ],
    cooking_time: {
      type: Number,
      required: true,
    },
    servings: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    images: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

const Recipe = mongoose.model("Recipe", recipeSchema);

export default Recipe;
