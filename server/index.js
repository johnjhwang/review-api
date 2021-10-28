const express = require('express');
const app = express();
const PORT = 3000;
const morgan = require('morgan');
const axios = require('axios');
const config = require('../config.js');
const API_KEY = config.API_KEY;
const url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-nyc';


app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/../client/dist'));

// attach authorization header with API key imported in from config.js file here or in helper js
// 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-nyc',



// ==================== Ratings & Reviews =========================

app.get('/reviews/:product_id', (req, res) => {
  console.log('req.params >>>>>', req.params)
  axios.get(`${url}/reviews?product_id=${req.params.product_id}`, {
    headers: {
      Authorization: API_KEY,
    }
  })
    .then((responseData) => {
      console.log('server responseData >>>', responseData);
      res.status(200).send(responseData.data)
    })
    .catch((err) => {
      console.log('error on server side >>>', err);
    })
})










// ================================================================















app.listen(PORT, () => {
  console.log(`Server listening at localhost:${PORT}!`);
});
