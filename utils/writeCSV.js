const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const header = [
  { id: 'id', title: 'id' },
  { id: 'created_at', title: 'created_at' },
  { id: 'updated_at', title: 'updated_at' },
  { id: 'box_type', title: 'box_type' },
  { id: 'title', title: 'title' },
  { id: 'slug', title: 'slug' },
  { id: 'short_title', title: 'short_title' },
  { id: 'marketing_description', title: 'marketing_description' },
  { id: 'calories_kcal', title: 'icalories_kcald' },
  { id: 'protein_grams', title: 'protein_grams' },
  { id: 'fat_grams', title: 'fat_grams' },
  { id: 'carbs_grams', title: 'carbs_grams' },
  { id: 'bulletpoint1', title: 'bulletpoint1' },
  { id: 'bulletpoint2', title: 'bulletpoint2' },
  { id: 'bulletpoint3', title: 'bulletpoint3' },
  { id: 'recipe_diet_type_id', title: 'recipe_diet_type_id' },
  { id: 'season', title: 'season' },
  { id: 'base', title: 'base' },
  { id: 'iprotein_sourced', title: 'protein_source' },
  { id: 'preparation_time_minutes', title: 'preparation_time_minutes' },
  { id: 'shelf_life_days', title: 'shelf_life_days' },
  { id: 'equipment_needed', title: 'equipment_needed' },
  { id: 'origin_country', title: 'origin_country' },
  { id: 'recipe_cuisine', title: 'recipe_cuisine' },
  { id: 'in_your_box', title: 'in_your_box' },
  { id: 'gousto_reference', title: 'gousto_reference' },
];

const writeCSV = (data, path) => {
  const csvWriter = createCsvWriter({ header, path });
  return csvWriter.writeRecords(data);
};

module.exports = writeCSV;
