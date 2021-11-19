const db = require('./index.js');


module.exports = {
  get: function (product_id, sort, callback) {


  },

  getMeta: function (product_id, callback) {

  },

  post: function (body, callback) {

  },

  update: function (review_id, action, callback) { // mark review as helpful and report review (PUT /reviews/:review_id/helpful) (PUT /reviews/:review_id/report)
    // split into helpful and report????
  }

}