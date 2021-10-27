const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/../client/dist'));

// attach authorization header with API key imported in from config.js file here or in helper js

app.listen(PORT, () => {
  console.log(`Server listening at localhost:${PORT}!`);
});
