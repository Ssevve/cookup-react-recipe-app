const mongoose = require('mongoose');

const { Schema } = mongoose;

const requiredString = {
  type: String,
  required: true,
};

const recipeSchema = new Schema(
  {
    name: {
      ...requiredString,
      trim: true,
      maxLength: 70,
    },
    description: {
      ...requiredString,
      trim: true,
    },
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
      type: [
        {
          type: String,
          trim: true,
          maxLength: 100,
        },
      ],
      validate: [(value) => value.length > 0, 'You must provide at least one ingredient.'],
    },
    directions: {
      type: [
        {
          type: String,
          trim: true,
        },
      ],
      validate: [(value) => value.length > 0, 'You must provide at least one direction.'],
    },
    likes: {
      type: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
      }],
      default: [],
    },
    images: {
      type: [
        {
          url: {
            ...requiredString,
            trim: true,
          },
          id: {
            ...requiredString,
            trim: true,
          },
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
