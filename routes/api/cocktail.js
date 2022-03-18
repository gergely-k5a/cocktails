const router = require('express').Router();
const axios = require('axios');

router.get('/', (req, res, next) => {
  console.log('Request for "/api/cocktail"');
  axios
    .get('https://www.thecocktaildb.com/api/json/v1/1/random.php')
    .then((response) => {
      const drink = response.data.drinks[0];
      const ingredients = Object.entries(drink)
        .filter(
          ([key, value]) =>
            key.startsWith('strIngredient') && ![null, ''].includes(value)
        )
        .sort((a, b) => a[0].substring(13) - b[0].substring(13))
        .map((entry) => entry[1]);
      const measures = ingredients.map((val, i) => drink[`strMeasure${i + 1}`]);

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
