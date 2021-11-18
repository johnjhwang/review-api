const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/reviewAPI');

const Reviews = new mongoose.Schema({
  review_id: Number,
  product_id: String,
  rating: Number,
  summary: String,
  recommend: Boolean,
  response: String,
  body: String,
  date: String,
  reviewer_name: String,
  reviewer_email: String,
  helpfulness: Number,
  photos: [
    {
      id: Number,
      url: String,
    },
  ],
});

const Metas = new mongoos.Schema({
  product_id: String,
  ratings: {
    1: String,
    2: String,
    3: String,
    4: String,
    5: String,
  },
  recommended: {
    false: String,
    true: String,
  },
  characteristics: {
    Size: {
      id: Number,
      value: String,
    },
    Width: {
      id: Number,
      value: String,
    },
    Comfort: {
      id: Number,
      value: String,
    },
    Quality: {
      id: Number,
      value: String,
    },
    Width: {
      id: Number,
      value: String,
    },
    Fit: {
      id: Number,
      value: String,
    },
  },
});

const Review = mongoose.model('Review', Reviews);
const Meta = mongoose.model('Meta', Metas);

// module.exports
