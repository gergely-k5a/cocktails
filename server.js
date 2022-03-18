const express = require('express');

const cocktail = require('./routes/api/cocktail.js');

const port = process.env.PORT || 5000;

const app = express();

app.get('/', (req, res) => {
  res.send('Cocktails API server started');
});

app.use('/api/cocktail', cocktail);

app.listen(port, () => {
  console.log(`Cocktails API server listening at port ${port}`);
});
