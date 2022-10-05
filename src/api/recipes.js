const router = require('express').Router();

const Recipe = require('../models/Recipe');

router.get('/', async (req, res, next) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const recipe = new Recipe(req.body);
    const createdRecipe = await recipe.save();
    res.json(createdRecipe);
  } catch (error) {
    if (error.name === 'ValidationError') res.status(422);
    next(error);
  }
  console.log(req.body);
});

module.exports = router;
