
require('dotenv').config()
const express = require('express');
const app = express();
const axios = require('axios');
const morgan = require('morgan');
const API_KEY = require('../config.js').API_KEY;
const url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-nyc';
const compression = require('compression');
const db = require('./db/index.js');
const helper = require('./db/helper.js');
const PORT = process.env.PORT;

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());

app.use(express.static(__dirname + '/../client/dist'));

// ==================== Ratings & Reviews =========================



app.get('/reviews/meta/:product_id', (req, res) => {
  const pid = req.params.product_id; // this is already in string form here
  helper.getMeta(pid, (err, responseData) => {
    if (err) {
      console.log('err in getting meta');
    } else {
      res.status(200).send(responseData);
    }
  });
});


app.get('/reviews/:product_id/:sort', (req, res) => {
  const pid = req.params.product_id; // this is already in string form here
  const sort = req.params.sort;
  helper.get(pid, sort, (err, responseData) => {
    if (err) {
      console.log('err in getting reviews');
    } else {
      res.status(200).send(responseData);
    }
  });
});



app.put('/reviews/:review_id/:action', (req, res) => {
  const rid = req.params.review_id;
  const action = req.params.action;
  helper.update(rid, action, (err) => {
    if (err) {
	    res.sendStatus(500);
    } else {
      res.sendStatus(204);
    }
  })
});

app.post('/reviews/', (req, res) => {
  const body = req.body;
  console.log('req.body >>>>', body);
  helper.post(body, (err) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.sendStatus(204);
    }
  })
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
