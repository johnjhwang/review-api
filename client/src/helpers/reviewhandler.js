const axios = require('axios');


//review helper functions that make the call to our server

module.exports = {
  get: function (product_id, callback) {
    axios.get(`/reviews/${product_id}`)
      .then((responseData) => {
        console.log('handler responseData >>>', responseData);
        callback(responseData.data);
      })
      .catch((err) => {
        console.log('handler error >>>>>', err);
      })
  },

  getMeta: function (product_id, callback) {
    axios.get(`/reviews/meta/${product_id}`)
      .then((responseData) => {
        console.log('handler metaData >>>', responseData);
        callback(responseData.data);
      })
      .catch((err) => {
        console.log('handler error >>>>>', err);
      })
  },

  post: {

  },

  update: { // mark review as helpful and report review (PUT /reviews/:review_id/helpful) (PUT /reviews/:review_id/report)

  }
}