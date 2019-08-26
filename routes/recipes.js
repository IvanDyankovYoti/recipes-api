const express = require('express');
const path = require('path');

const router = express.Router({
  // pin down the endpoints
  caseSensitive: true,
  strict: true,
});

const readPage = require('../utils/readPage');
const logger = require('../utils/logger');
const createDB = require('../seedData');
const writeCSV = require('../utils/writeCSV');

const getRecipes = async () => {
  // TODO: swap for a real database, this creates a DB the data every time :/
  const { entities: { recipes } } = await createDB();
  return recipes;
};

const filterRecipesByCuisine = (recipes, recipe_cuisine) => Object.values(recipes).reduce(
  (acc, curr) => {
    if (curr.recipe_cuisine === recipe_cuisine) acc.push(curr);
    return acc;
  }, [],
);

router.get('/', async (req, res) => {
  const { recipe_cuisine } = req.query;
  let recipes;

  try {
    recipes = await getRecipes();
  } catch (err) {
    logger.error(err);
    return res.sendStatus(500);
  }

  if (!recipe_cuisine) return res.json(readPage(recipes));

  const result = filterRecipesByCuisine(recipes, recipe_cuisine);
  return res.json(readPage(result));
});

router.get('/:id', async (req, res) => {
  const { params: { id } } = req;
  let recipes;
  try {
    recipes = await getRecipes();
  } catch (err) {
    logger.error(err);
    return res.sendStatus(500);
  }
  const recipe = recipes[id];
  return recipe ? res.json(recipe) : res.sendStatus(404);
});

router.put('/:id', async (req, res) => {
  const { params: { id } } = req;
  let recipes;
  try {
    recipes = await getRecipes();
  } catch (err) {
    logger.error(err);
    return res.sendStatus(500);
  }
  const recipe = recipes[id];

  if (!recipe) return res.sendStatus(404);

  // TODO: ensure the body contians valid data for each field, when such informtaion is available.
  // Can use libraries such as Joi.
  // For now simply merge into the recipe state.
  Object.assign(recipes[id], req.body);

  try {
    await writeCSV(Object.values(recipes), path.resolve(__dirname, '../seedData/recipe-data.csv'));
    return res.json(recipes[id]);
  } catch (err) {
    logger.error(err);
    return res.sendStatus(500);
  }
});

module.exports = router;
