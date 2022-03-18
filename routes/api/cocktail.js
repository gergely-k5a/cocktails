const router = require('express').Router();
const axios = require('axios');

router.get('/', (req, res, next) => {
  console.log('Request for "/api/cocktail"');
  axios
    .get('https://www.thecocktaildb.com/api/json/v1/1/random.php')
    .then((response) => res.send(response.data.drinks[0]))
    .catch((err) => next(err));
});

module.exports = router;
