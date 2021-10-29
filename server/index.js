const express = require('express');
const app = express();
const PORT = 3000;
const config = require('../config.js');
const API_KEY = config.API_KEY;
const helpers = require('./helpers.js');
const axios = require('axios');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/../client/dist'));

// attach authorization header with API key imported in from config.js file here or in helper js

//request handler for get individual product information
app.get('/products/:product_id', (req, res) => {
  //console.log('REQ.PARAMS: ', req.params);
  axios.get(
    `https://app-hrsei-api.herokuapp.com/api/fec2/hr-nyc/products/${req.params.product_id}`,
    { headers: { 'Authorization': API_KEY }}
  )
    .then((results) => {
      res.send(results.data)
    })
    .catch((err) => {
      console.log('Error in getting individual product information: ', err);
    })
})

//route for get related product id
app.get('/products/:product_id/related', (req, res) => {
  //console.log('REQ.PARAMS: ', req.params);
  axios.get(
    `https://app-hrsei-api.herokuapp.com/api/fec2/hr-nyc/products/${req.params.product_id}/related`,
    { headers: { 'Authorization': API_KEY }}
  )
    .then((results) => {
      res.send(results.data)
    })
    .catch((err) => {
      console.log('Error in getting individual product information: ', err);
    })
})
















app.listen(PORT, () => {
  console.log(`Server listening at localhost:${PORT}!`);
});
