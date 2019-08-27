# Recipes API
## Description
The Recipes API is a NodeJS service, which is responsible for handling recipes data. It has been developed using the Express JS framework.

It keeps the recipes data in a CSV file and is able to perform GET and PUT (retrieval and update) operations.

The service uses the following libraries:
- [normalizr](https://www.npmjs.com/package/normalizr) - this normalises the JSON representation of the read CSV data in order to optimise it for searching (if there was a real data base there would have been no need for this as the records would have been indexed)
- [csv-parser](https://www.npmjs.com/package/csv-parser) -  read CSV files
- [csv-writer](https://www.npmjs.com/package/csv-writer) -  writes to CSV files

## Requirements
- Node JS v8.12
- NPM v6.4.1

## How to run
- Run the API Server
```sh
npm start # available on localhost:3000/recipes
```
- Local development (automatically restart the server when code change happens)
```sh
$ npm run dev # available on localhost:3000/recipes
```
- Run tests
```sh
$ npm test
```
- Run code linter
```sh
$ npm run lint
```
## Ednpoints

- Postman collection can be found in the `/postman` folder of this project

### GET /recipes

Example request
- GET http://<HOST_NAME>/recipes?recipe_cuisine=mexican
- Headers: Accpet: "application/json"
- QueryString: recipe_cuisine - optional, example values (asian, british, mexican)

Exmaple JSON response
200 OK
``` JSON
[{
  "id": "10",
  "title": "Pork Katsu Curry",
  "description": "Comprising all the best bits of the classic American ..."
}]
```
- If no results have been found the response will be an empty array

### GET /recipes/:id

Example request
- GET http://<HOST_NAME>/recipes/1
- Headers: Accpet: "application/json"

<details><summary>Exmaple 200 OK JSON response</summary>
<p>

``` JSON
{
  "id": "1",
  "created_at": "30/06/2015 17:58:00",
  "updated_at": "30/06/2015 17:58:00",
  "box_type": "vegetarian",
  "title": "UPDATED Sweet Chilli and Lime Beef on a Crunchy Fresh Noodle Salad",
  "slug": "sweet-chilli-and-lime-beef-on-a-crunchy-fresh-noodle-salad",
  "short_title": "",
  "marketing_description": "Here we've used onglet steak which is an extra flavoursome cut of beef that should never be cooked past medium rare. So if you're a fan of well done steak, this one may not be for you. However, if you love rare steak and fancy trying a new cut, please be",
  "icalories_kcald": "401",
  "protein_grams": "12",
  "fat_grams": "35",
  "carbs_grams": "0",
  "bulletpoint1": "",
  "bulletpoint2": "",
  "bulletpoint3": "",
  "recipe_diet_type_id": "meat",
  "season": "all",
  "base": "noodles",
  "protein_source": "",
  "preparation_time_minutes": "35",
  "shelf_life_days": "4",
  "equipment_needed": "Appetite",
  "origin_country": "Great Britain",
  "recipe_cuisine": "asian",
  "in_your_box": "",
  "gousto_reference": "59"
}
```
- Returns 404 when recipe with ID is not found
</p></details>

### POST /recipes/:id

Example request
- POST http://<HOST_NAME>/recipes/1
- Headers: Content-Type: "application/json"
- Body: JSON with the fields to be updates

```JSON
{
	"title": "UPDATED Sweet Chilli and Lime Beef on a Crunchy Fresh Noodle Salad"
}
```

<details><summary>Exmaple 200 OK JSON response</summary>
<p>

```JSON
{
  "id": "1",
  "created_at": "30/06/2015 17:58:00",
  "updated_at": "30/06/2015 17:58:00",
  "box_type": "vegetarian",
  "title": "UPDATED Sweet Chilli and Lime Beef on a Crunchy Fresh Noodle Salad",
  "slug": "sweet-chilli-and-lime-beef-on-a-crunchy-fresh-noodle-salad",
  "short_title": "",
  "marketing_description": "Here we've used onglet steak which is an extra flavoursome cut of beef that should never be cooked past medium rare. So if you're a fan of well done steak, this one may not be for you. However, if you love rare steak and fancy trying a new cut, please be",
  "icalories_kcald": "401",
  "protein_grams": "12",
  "fat_grams": "35",
  "carbs_grams": "0",
  "bulletpoint1": "",
  "bulletpoint2": "",
  "bulletpoint3": "",
  "recipe_diet_type_id": "meat",
  "season": "all",
  "base": "noodles",
  "protein_source": "",
  "preparation_time_minutes": "35",
  "shelf_life_days": "4",
  "equipment_needed": "Appetite",
  "origin_country": "Great Britain",
  "recipe_cuisine": "asian",
  "in_your_box": "",
  "gousto_reference": "59"
}
```
- Returns 404 when recipe with ID is not found
</p></details>

## Improvemets (TODOs)
- Improve the API doc (i.e. Swagger Doc)
- Add a database
- Validate request body against a schema for the PUT endpoint
- Make error responses adhere to [RFC_7807](https://tools.ietf.org/html/rfc7807)
- Implement a POST and DELETE endpoints
- Unit tests for 500 error responses
- Unit tests for the utility functions
