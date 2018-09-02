'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_ROOT:'"http://localhost:1954"',
  LOGIN_URI:'"http://192.168.0.120:8000/OAuth/Server/GetMemberCode.aspx"'
})
