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
          name: requiredString,
          unit: requiredString,
          unitShort: requiredString,
          amount: {
            type: Number,
            required: true,
          },
        },
      ],
      validate: [
        (value) => value.length > 0,
        'You must provide at least one ingredient.',
      ],
    },
    instructions: {
      type: [
        {
          instructionIndex: Number,
          title: requiredString,
          text: requiredString,
        },
      ],
      validate: [
        (value) => value.length > 0,
        'You must provide at least one instruction.',
      ],
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
