/* eslint-disable no-underscore-dangle */
const router = require('express').Router();
const multer = require('multer');

const upload = multer({ storage: multer.diskStorage({}) });

const Recipe = require('../models/Recipe');
const cloudinary = require('../lib/cloudinary');

router.get('/:recipeId', async (req, res, next) => {
  const { recipeId } = req.params;
  try {
    const recipe = await Recipe.findById(recipeId);
    res.json(recipe);
  } catch (error) {
    next(error);
  }
});

router.get('/user/:userId', async (req, res, next) => {
  try {
    const { userId } = req.params;
    const recipes = await Recipe.find({ createdBy: userId }).populate('createdBy').select('_id title description imageUrl createdBy');
    res.json(recipes);
  } catch (error) {
    next(error);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const recipes = await Recipe.find().populate('createdBy').select('_id title description imageUrl createdBy');
    res.json(recipes);
  } catch (error) {
    next(error);
  }
});

router.post('/', upload.single('image'), async (req, res, next) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    const recipe = JSON.parse(req.body.recipe);

    const createdRecipe = await Recipe.create({
      ...recipe,
      createdBy: req.user._id,
      imageUrl: result.secure_url,
      cloudinaryId: result.public_id,
    });

    res.json(createdRecipe);
  } catch (error) {
    next(error);
  }
});

router.delete('/:recipeId', async (req, res, next) => {
  try {
    const recipe = await Recipe.findById({ _id: req.params.recipeId });

    if (req.user._id.equals(recipe.createdBy)) {
      await cloudinary.uploader.destroy(recipe.cloudinaryId);
      await Recipe.remove({ _id: req.params.recipeId });
      return res.json({ message: 'Recipe deleted' });
    }

    return res.status(401).json({ message: 'Unauthorized' });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
