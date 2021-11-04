const express = require('express');
const app = express();
const PORT = 3000;
const axios = require('axios');
const helpers = require('./QAhelpers.js');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/../client/dist'));

// -------get questions-----
app.get('/qa/questions', (req, res) => {
  helpers.getQuestion(req.query.product_id)
  .then((questions) => {
    res.json(questions.data)
  })
  .catch((err) => {
    console.log(err);
  })
})
// ----- getAnswers------
app.get('/qa/answers', (req, res) => {
  helpers.getAnswers(question_id)
  .then((answers) => {
    res.json(answers.data)
  })
  .catch((err) => {
    console.log(err)
  })
})
// ----post questions-----
app.post('/qa/questions', (req, res) =>
{
  req.body.body = body;
  req.body.name = name;
  req.body.email = email;
  req.body.product_id = product_id;
  helpers.createQuestion(body, name, email, product_id)
  .then((question) => {
    console.log(question)
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
  helpers.createAnswer(body, name, email, product_id)
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



















app.listen(PORT, () => {
  console.log(`Server listening at localhost:${PORT}!`);
});
