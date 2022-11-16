const mongoose = require('mongoose');

const { Schema } = mongoose;

const requiredString = {
  type: String,
  required: true,
};

const recipeSchema = new Schema(
  {
    name: requiredString,
    description: requiredString,
    dishType: {
      ...requiredString,
      enum: ['main dish', 'side dish', 'appetizer', 'soup', 'salad', 'dessert', 'drink'],
    },
    servings: {
      type: Number,
      required: true,
      validate: {
        validator: Number.isInteger,
        message: '{VALUE} is not an integer value',
      },
    },
    difficulty: {
      ...requiredString,
      enum: ['easy', 'moderate', 'hard'],
    },
    prepTime: {
      time: {
        type: Number,
        required: true,
        validate: {
          validator: Number.isInteger,
          message: '{VALUE} is not an integer value',
        },
      },
      unit: {
        ...requiredString,
        enum: ['minutes', 'hours'],
      },
    },
    cookTime: {
      time: {
        type: Number,
        required: true,
        validate: {
          validator: Number.isInteger,
          message: '{VALUE} is not an integer value',
        },
      },
      unit: {
        ...requiredString,
        enum: ['minutes', 'hours'],
      },
    },
    ingredients: {
      type: [String],
      validate: [(value) => value.length > 0, 'You must provide at least one ingredient.'],
    },
    directions: {
      type: [String],
      validate: [(value) => value.length > 0, 'You must provide at least one direction.'],
    },
    images: {
      type: [
        {
          url: requiredString,
          id: requiredString,
          _id: false,
        },
      ],
      default: [],
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true },
);

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
