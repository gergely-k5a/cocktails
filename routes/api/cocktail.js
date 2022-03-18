const router = require('express').Router();
const axios = require('axios');

router.get('/', (req, res, next) => {
  console.log('Request for "/api/cocktail"');
  const searchStr = req.query.searchStr;
  const url = searchStr
    ? `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchStr}`
    : 'https://www.thecocktaildb.com/api/json/v1/1/random.php';

  if (searchStr) {
    console.log(`Searching for ${searchStr}`);
  }

  axios
    .get(url)
    .then((response) => {
      if (!response.data?.drinks || response.data.drinks.length === 0) {
        res.status(404).send('Cocktail not found!');
        return;
      }

      const drink = response.data.drinks[0];

      const ingredients = Object.entries(drink)
        .filter(
          ([key, value]) =>
            key.startsWith('strIngredient') && ![null, ''].includes(value)
        )
        .sort((a, b) => a[0].substring(13) - b[0].substring(13))
        .map((entry) => entry[1]);

      const measures = ingredients.map((val, i) =>
        drink[`strMeasure${i + 1}`] === '' ? null : drink[`strMeasure${i + 1}`]
      );

      res.json({
        name: drink.strDrink,
        instructions: drink.strInstructions,
        ingredients,
        measures,
        image: drink.strDrinkThumb,
      });
    })
    .catch((err) => next(err));
});

module.exports = router;
