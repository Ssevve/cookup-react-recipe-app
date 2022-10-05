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
    ingredients: {
      type: [
        {
          _id: false,
          name: requiredString,
          unit: requiredString,
          unitShort: requiredString,
          amount: {
            type: Number,
            required: true,
          },
        },
      ],
      validate: [(value) => value.length > 0, 'You must provide at least one ingredient.'],
    },
    steps: {
      type: [
        {
          _id: false,
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
      validate: [
        (value) => value.length > 0,
        'You must provide at least one step.',
      ],
    },
    images: [
      {
        type: String,
        default: null,
      },
    ],
  },
  { timestamps: true },
);

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
