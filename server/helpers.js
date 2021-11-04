const axios = require('axios');
const config = require('../config.js');


module.exports.helpers = {
  getProducts: (id) => {
    console.log('hello');
    let options = {
      headers: {
        'User-Agent': 'request',
        'Authorization': `${config.API_KEY}`
      }
    }
    return axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-nyc/products/${id}`, options);
  },
  getStyle: (id) => {
    let options = {
      headers: {
        'User-Agent': 'request',
        'Authorization': `${config.API_KEY}`
      }
    }
    return axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-nyc/products/${id}/styles`, options);
  }
}
