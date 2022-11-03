/* eslint-disable no-underscore-dangle */
const router = require('express').Router();
const multer = require('multer');

const upload = multer({ storage: multer.diskStorage({}) });

const Recipe = require('../models/Recipe');
const cloudinary = require('../config/cloudinary');
const ensureAuth = require('../middleware/ensureAuth');
const units = require('../lib/units.json');

router.get('/:recipeId', async (req, res, next) => {
  const { recipeId } = req.params;
  try {
    const recipe = await Recipe.findById(recipeId);
    res.status(200).json(recipe);
  } catch (error) {
    next(error);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const recipes = await Recipe.find()
      .populate('createdBy', '_id firstName lastName avatar')
      .select('_id title description imageUrl createdBy');
    res.status(200).json(recipes);
  } catch (error) {
    next(error);
  }
});

router.get('/user/:userId', ensureAuth, async (req, res, next) => {
  try {
    const { userId } = req.params;
    const recipes = await Recipe.find({ createdBy: userId })
      .populate('createdBy')
      .select('_id title description imageUrl createdBy');
    res.status(200).json(recipes);
  } catch (error) {
    next(error);
  }
});

router.post('/', ensureAuth, upload.single('image'), async (req, res, next) => {
  try {
    let cloudinaryResult;
    if (req.file) cloudinaryResult = await cloudinary.uploader.upload(req.file.path);

    const recipe = JSON.parse(req.body.recipe);
    if (!recipe) return res.status(400).json({ message: 'Invalid input' });

    const ingredientsWithShortUnits = recipe.ingredients.map((ingredient) => {
      const shortUnit = units[ingredient.unit];
      if (!shortUnit) return res.status(400).json({ message: 'Invalid ingredient unit.' });
      return { ...ingredient, unitShort: shortUnit };
    });

    const createdRecipe = await Recipe.create({
      ...recipe,
      ingredients: ingredientsWithShortUnits,
      createdBy: req.user._id,
      imageUrl: cloudinaryResult ? cloudinaryResult.secure_url : null,
      cloudinaryId: cloudinaryResult ? cloudinaryResult.public_id : null,
    });

    return res.status(201).json(createdRecipe);
  } catch (error) {
    return next(error);
  }
});

router.put('/:recipeId', ensureAuth, upload.single('image'), async (req, res, next) => {
  try {
    let cloudinaryResult;
    if (req.file) cloudinaryResult = await cloudinary.uploader.upload(req.file.path);

    const recipe = JSON.parse(req.body.recipe);
    if (!recipe) return res.status(400).json({ message: 'Invalid input' });

    const ingredientsWithShortUnits = recipe.ingredients.map((ingredient) => {
      const shortUnit = units[ingredient.unit];
      if (!shortUnit) return res.status(400).json({ message: 'Invalid ingredient unit.' });
      return { ...ingredient, unitShort: shortUnit };
    });

    const updatedRecipe = await Recipe.findOneAndUpdate(
      { _id: req.params.recipeId, createdBy: req.user._id },
      {
        $set: {
          title: recipe.title,
          description: recipe.description,
          ingredients: ingredientsWithShortUnits,
          instructions: recipe.instructions,
          imageUrl: cloudinaryResult ? cloudinaryResult.secure_url : recipe.imageUrl,
          cloudinaryId: cloudinaryResult ? cloudinaryResult.public_id : recipe.cloudinaryId,
        },
      },
    );
    return res.status(200).json(updatedRecipe);
  } catch (error) {
    return next(error);
  }
});

router.delete('/:recipeId', ensureAuth, async (req, res, next) => {
  try {
    const recipe = await Recipe.findOne({
      _id: req.params.recipeId,
      createdBy: req.user._id,
    });

    console.log(recipe);

    if (recipe.cloudinaryId) await cloudinary.uploader.destroy(recipe.cloudinaryId);
    await recipe.remove();
    return res.status(204).json('success');
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
