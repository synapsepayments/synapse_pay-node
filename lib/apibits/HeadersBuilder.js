'use strict';

var _ = require('lodash');

function HeadersBuilder(headers) {
  headers = (typeof headers === 'undefined') ? {} : headers;
  headers = headers || {};

  return _.merge(_defaultHeaders(), headers);
}

function _defaultHeaders() {
  var SynapsePay = require('../SynapsePay');
  return _.extend({
    "User-Agent": "SynapsePay/v2 NodeBindings/0.0.1"
  }, {
    "Content-Type": "application/json",
  });
}

module.exports = HeadersBuilder;
