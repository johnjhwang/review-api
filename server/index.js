const express = require('express');
const app = express();
const axios = require('axios');
const morgan = require('morgan');
const db = require('./db/index.js');
const helper = require('./db/helper.js');
const PORT = 3000;

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/../client/dist'));

// ==================== Ratings & Reviews =========================


app.get('/', (req, res) => {
  res.status(200).send('hi');
});


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



app.listen(PORT, () => {
  console.log(`Server listening at localhost:${PORT}!`);
});
