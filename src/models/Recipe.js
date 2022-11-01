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
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    ingredients: {
      type: [
        {
          name: requiredString,
          unit: {
            ...requiredString,
            enum: [
              'kilogram',
              'gram',
              'milligram',
              'liter',
              'milliliter',
              'cup',
              'tablespoon',
              'teaspoon',
              'piece',
            ],
          },
          unitShort: {
            ...requiredString,
            enum: [
              'kg',
              'g',
              'mgm',
              'l',
              'ml',
              'c',
              'T',
              't',
              'pcs',
            ],
          },
          amount: {
            type: Number,
            required: true,
          },
        },
      ],
      validate: [(value) => value.length > 0, 'You must provide at least one ingredient.'],
    },
    instructions: {
      type: [
        {
          instructionIndex: Number,
          title: requiredString,
          description: requiredString,
        },
      ],
      validate: [(value) => value.length > 0, 'You must provide at least one instruction.'],
    },
    imageUrl: {
      type: String,
      default: null,
    },
    cloudinaryId: {
      type: String,
      default: null,
    },
  },
  { timestamps: true },
);

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
