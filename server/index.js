const express = require('express');
const app = express();
const PORT = 3000;
const config = require('../config.js');
const API_KEY = config.API_KEY;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/../client/dist'));

let {helpers} = require('./helpers.js');

// attach authorization header with API key imported in from config.js file here or in helper js



// app.get('/products', function (req, res) {

// })



app.get(`/products/:productid`, function (req, res) {
  // TODO - your code here!
  console.log(req.params.productid);
  let end = {};
  helpers.getProducts(req.params.productid).then((product) => {
    end.product = product.data;
    helpers.getStyle(req.params.productid).then((styles) => {
      end.styles = styles.data.results;
      res.status(200).send(end);
    })
  })
  
  
});







app.listen(PORT, () => {
  console.log(`Server listening at localhost:${PORT}!`);
});
