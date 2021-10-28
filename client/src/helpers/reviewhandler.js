const axios = require('axios');


//review helper functions that make the call to our server

module.exports = {
  get: function (product_id, callback) {
    axios.get(`/reviews/${product_id}`)
      .then((responseData) => {
        callback(responseData.data);
      })
      .catch((err) => {
        console.log('handler error >>>>>', err);
      })
  },

  getMeta: {

  },

  post: {

  }

}