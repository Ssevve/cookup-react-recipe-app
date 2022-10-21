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

router.get('/', async (req, res, next) => {
  try {
    const recipes = await Recipe.find().select('_id title description image');
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
      image: result.secure_url,
      cloudinaryId: result.public_id,
    });

    res.json(createdRecipe);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
