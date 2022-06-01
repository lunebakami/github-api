const axios = require('axios');

const api = axios.create({
  baseURL: 'https://developer.github.com/v3',
});

module.exports = api;
