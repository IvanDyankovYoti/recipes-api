const { normalize, schema } = require('normalizr');

const recipeSchema = new schema.Entity('recipes');
const recipeListSchema = new schema.Array(recipeSchema);

const normaliseData = (data) => normalize(data, recipeListSchema);

module.exports = normaliseData;
