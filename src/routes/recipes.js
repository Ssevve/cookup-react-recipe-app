/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
const router = require('express').Router();
const upload = require('../middleware/multer');

const ensureAuth = require('../middleware/ensureAuth');

const recipesController = require('../controllers/recipes');

router.post('/', ensureAuth, upload.array('files'), recipesController.createRecipe);
router.get('/', recipesController.getAllRecipes);
router.get('/:recipeId', recipesController.getSpecificRecipe);
router.get('/user/:userId', recipesController.getSpecificUserRecipes);
router.put('/like/:recipeId', ensureAuth, recipesController.toggleLike);
router.put('/:recipeId', ensureAuth, upload.array('files'), recipesController.updateRecipe);
router.delete('/:recipeId', ensureAuth, recipesController.deleteRecipe);

module.exports = router;
