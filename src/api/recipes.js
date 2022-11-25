/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
const router = require('express').Router();
const upload = require('../middleware/multer');

const Recipe = require('../models/Recipe');
const cloudinary = require('../config/cloudinary');
const ensureAuth = require('../middleware/ensureAuth');
const units = require('../lib/units.json');

router.get('/:recipeId', async (req, res, next) => {
  const { recipeId } = req.params;
  try {
    const recipe = await Recipe.findById(recipeId)
      .populate('createdBy', '_id firstName lastName avatar');
    res.status(200).json(recipe);
  } catch (error) {
    next(error);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const recipes = await Recipe.find()
      .select('_id name description images likes dishType createdBy');
    res.status(200).json(recipes);
  } catch (error) {
    next(error);
  }
});

router.get('/user/:userId', async (req, res, next) => {
  try {
    const recipes = await Recipe.find()
      .select('_id name images likes dishType createdBy');

    const userRecipes = recipes.filter((recipe) => recipe.createdBy._id.toString() === req.params.userId.toString());
    const likedRecipes = recipes.filter((recipe) => recipe.likes.includes(req.params.userId));
    res.status(200).json({ userRecipes, likedRecipes });
  } catch (error) {
    next(error);
  }
});

router.post('/', ensureAuth, upload.array('images'), async (req, res, next) => {
  try {
    const images = [];
    if (req.files) {
      const imagePromises = req.files.map((file) => cloudinary.uploader.upload(file.path));
      const imageResponses = await Promise.all(imagePromises);


      imageResponses.forEach((image, imageIndex) => {
        images.push({ url: image.secure_url, cloudinaryId: image.public_id, name: req.files[imageIndex].originalname });
      });
    }

    const recipe = JSON.parse(req.body.recipe);
    if (!recipe) return res.status(400).json({ message: 'No recipe was provided.' });

    if (recipe.name.trim().length < 1 || recipe.name.trim().length > 70) return res.status(400).json({ message: 'Invalid recipe name.' });

    const ingredients = recipe.ingredients.map((ingredient) => {
      if (ingredient.name && ingredient.name.trim().length > 0 && ingredient.name.trim().length <= 70) {
        return ingredient.name;
      }
      return res.status(400).json({ message: 'Invalid ingredient value.' });
    });

    const directions = recipe.directions.map((direction) => {
      if (direction.description && direction.description.trim().length) {
        return direction.description;
      }
      return res.status(400).json({ message: 'Invalid direction value.' });
    });

    const createdRecipe = await Recipe.create({
      ...recipe,
      ingredients,
      directions,
      images,
      createdBy: req.user._id,
    });

    return res.status(201).json(createdRecipe);
  } catch (error) {
    return next(error);
  }
});

router.put('/like/:recipeId', ensureAuth, async (req, res, next) => {
  try {
    const recipe = await Recipe.findById(req.params.recipeId);
    if (recipe.createdBy.toString() === req.user._id.toString()) return res.status(400).json({ message: 'Users cannot like their own recipes.' });

    let updatedRecipe;
    if (recipe.likes.includes(req.user._id)) {
      updatedRecipe = await Recipe.findOneAndUpdate(
        { _id: req.params.recipeId },
        {
          $pull: { likes: req.user._id },
        },
        {
          new: true,
        },
      );
    } else {
      updatedRecipe = await Recipe.findOneAndUpdate(
        { _id: req.params.recipeId },
        {
          $push: { likes: req.user._id },
        },
        {
          new: true,
        },
      );
    }

    return res.status(200).json(updatedRecipe);
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
          imagesUrls: cloudinaryResult ? cloudinaryResult.secure_url : recipe.imageUrl,
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
