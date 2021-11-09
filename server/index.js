const express = require('express');
const app = express();
const PORT = 3000;
const axios = require('axios');
const QAhelpers = require('./QAhelpers.js');
const morgan = require('morgan');
const config = require('../config.js');
const API_KEY = config.API_KEY;
const url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-nyc';
const helpers = require('./helpers.js');


app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/../client/dist'));

// -------get questions-----
app.get('/qa/questions', (req, res) => {
  QAhelpers.getQuestion(req.query.product_id)
  .then((questions) => {
    res.json(questions.data)
  })
  .catch((err) => {
    console.log(err);
  })
})
// ----- getAnswers------
app.get('/qa/answers', (req, res) => {
  QAhelpers.getAnswers(question_id)
  .then((answers) => {
    res.json(answers.data)
  })
  .catch((err) => {
    console.log(err)
  })
})
// ----post questions-----
app.post('/qa/questions', (req, res) => {
  console.log(req.body)
  let body = req.body.body;
  let name = req.body.name;
  let email = req.body.email;
  let product_id = req.body.product_id;
  QAhelpers.createQuestion(body, name, email, product_id)
  .then((question) => {
    res.sendStatus(200)
  })
  .catch((err) => {
    console.log(err);
  })
})

// ---- post answers------

app.post('/qa/answers', (req, res) =>
{
  req.body.question_id = question_id;
  req.body.body = body;
  req.body.name = name;
  req.body.email = email;
  req.body.product_id = product_id;
  QAhelpers.createAnswer(body, name, email, product_id)
  .then((answer) => {
    console.log(answer)
  })
  .catch((err) => {
    console.log(err);
  })
})

// ---- add to the Question helpfulness count ----



// --- report question ------


// ---- report answer -------





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













app.listen(PORT, () => {
  console.log(`Server listening at localhost:${PORT}!`);
});
