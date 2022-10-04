const mongoose = require('mongoose');

const { Schema } = mongoose;

const requiredString = {
  type: String,
  required: true,
};

const recipeSchema = new Schema(
  {
    title: requiredString,
    description: requiredString,
    ingredients: [
      {
        name: requiredString,
        measureUnit: requiredString,
        measure: {
          type: Number,
          required: true,
        },
      },
    ],
    steps: [
      {
        stepNumber: {
          type: Number,
          required: true,
        },
        text: requiredString,
        completed: {
          type: Boolean,
          default: false,
        },
      },
    ],
    servings: {
      type: Number,
      min: 1,
      default: 1,
    },
    prepTime: {
      type: Number,
    },
    image: {
      type: String,
      default: null,
    },
  },
  { timestamps: true },
);

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
