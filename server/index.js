const express = require('express');
const app = express();
const PORT = 3000;
const axios = require('axios');
const morgan = require('morgan');
const API_KEY = require('../config.js').API_KEY;
const url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-nyc';
const compression = require('compression');
const db = require('./db/index.js');
const helper = require('./db/helper.js');

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());

app.use(express.static(__dirname + '/../client/dist'));



// ==================== Ratings & Reviews =========================

app.get('/reviews/:product_id/:sort', (req, res) => {
  console.log('req.params for sort >>>>>', req.params);

});

app.get('/reviews/meta/:product_id', (req, res) => {
  axios
    .get(`${url}/reviews/meta?product_id=${req.params.product_id}`, {
      headers: {
        Authorization: API_KEY,
      },
    })
    .then((responseData) => {
      res.status(200).send(responseData.data);
    })
    .catch((err) => {
      console.log('error on server side >>>', err);
    });
});

app.put('/reviews/:review_id/:action', (req, res) => {
  axios
    .put(
      `${url}/reviews/${req.params.review_id}/${req.params.action}`,
      {},
      {
        headers: {
          Authorization: API_KEY,
        },
      }
    )
    .then((responseData) => {
      res.status(204).send(responseData.data);
    })
    .catch((err) => {
      console.log('error on PUT server side >>>', err);
    });
});

app.post('/reviews/', (req, res) => {
  axios
    .post(`${url}/reviews/`, req.body, {
      headers: {
        Authorization: API_KEY,
      },
    })
    .then((response) => {
      res.status(201).send(response.data);
    })
    .catch((err) => {
      console.log('error POSTing new review server side >>>', err);
    });
});

// ================================================================
app.get('/products/:product_id', (req, res) => {
  axios
    .get(
      `https://app-hrsei-api.herokuapp.com/api/fec2/hr-nyc/products/${req.params.product_id}`,
      {
        headers: {
          Authorization: API_KEY,
        },
      }
    )
    .then((results) => {
      res.send(results.data);
    })
    .catch((err) => {
      console.log('Error in getting individual product information: ', err);
    });
});

app.listen(PORT, () => {
  console.log(`Server listening at localhost:${PORT}!`);
});
