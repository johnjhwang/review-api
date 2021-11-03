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

///////////////////////////////Related Product and Comparison////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////
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

//request handler for get related product id
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

//request handler for get product styles
app.get('/products/:product_id/styles', (req, res) => {
  //console.log('REQ.PARAMS: ', req.params);
  axios.get(
    `https://app-hrsei-api.herokuapp.com/api/fec2/hr-nyc/products/${req.params.product_id}/styles`,
    { headers: { 'Authorization': API_KEY }}
  )
    .then((results) => {
      //console.log('results.data.results🐥',results.data.results)
      res.send(results.data)
    })
    .catch((err) => {
      console.log('Error in getting individual product information: ', err);
    })
})

//request handler for get product ratings
app.get('/reviews/meta/:product_id', (req, res) => {
  //console.log('REQ.PARAMS: ', req.params);
  axios.get(
    `https://app-hrsei-api.herokuapp.com/api/fec2/hr-nyc/reviews/meta?product_id=${req.params.product_id}`,
    { headers: { 'Authorization': API_KEY }}
  )
    .then((results) => {
      //console.log('results.data',results.data)
      res.send(results.data)
    })
    .catch((err) => {
      console.log('Error in getting individual product information: ', err);
    })
})

/////////////////////////////////////////////////////////////////////////////////////////////////////
























// ==================== Ratings & Reviews =========================

app.get('/reviews/:product_id', (req, res) => {
  console.log('req.params >>>>>', req.params)
  axios.get(`${url}/reviews?product_id=${req.params.product_id}`, { // refactor to use params obj?
    headers: {
      Authorization: API_KEY,
    }
  })
    .then((responseData) => {
      console.log('server responseData.data >>>', responseData.data);
      res.status(200).send(responseData.data)
    })
    .catch((err) => {
      console.log('error on server side >>>', err);
    })
})

app.get('/reviews/meta/:product_id', (req, res) => {
  console.log('req.params >>>>>', req.params)
  axios.get(`${url}/reviews/meta?product_id=${req.params.product_id}`, {
    headers: {
      Authorization: API_KEY,
    }
  })
    .then((responseData) => {
      console.log('server response.metadata >>>', responseData.data);
      res.status(200).send(responseData.data)
    })
    .catch((err) => {
      console.log('error on server side >>>', err);
    })
})


// ================================================================









// ================================================================















app.listen(PORT, () => {
  console.log(`Server listening at localhost:${PORT}!`);
});
