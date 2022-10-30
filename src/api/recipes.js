/* eslint-disable no-underscore-dangle */
const router = require('express').Router();
const multer = require('multer');

const upload = multer({ storage: multer.diskStorage({}) });

const Recipe = require('../models/Recipe');
const cloudinary = require('../lib/cloudinary');
const ensureAuth = require('../middleware/ensureAuth');
const unitMapping = require('../lib/units.json');

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
    const result = await cloudinary.uploader.upload(req.file.path);
    const recipe = JSON.parse(req.body.recipe);

    const createdRecipe = await Recipe.create({
      ...recipe,
      unitShort: unitMapping[recipe.unit],
      createdBy: req.user._id,
      imageUrl: result.secure_url,
      cloudinaryId: result.public_id,
    });

    res.status(201).json(createdRecipe);
  } catch (error) {
    next(error);
  }
});

router.delete('/:recipeId', ensureAuth, async (req, res, next) => {
  try {
    const recipe = await Recipe.findOne({
      _id: req.params.recipeId,
      createdBy: req.user._id,
    });

    console.log(recipe.cloudinaryId);

    await cloudinary.uploader.destroy(recipe.cloudinaryId);
    await Recipe.deleteOne({ _id: req.params.recipeId });
    return res.status(204).json('success');
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
