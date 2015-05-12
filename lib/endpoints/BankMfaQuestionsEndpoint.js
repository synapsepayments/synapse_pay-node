'use strict';

var _ = require('lodash');
var APIMethod = require('../apibits/APIMethod');
var APIResource = require('../apibits/APIResource');
var APIList = require('../apibits/APIList');
var Client = require('../Client');

function BankMfaQuestionsEndpoint(client) {
  if(!(this instanceof BankMfaQuestionsEndpoint)) {
    return new BankMfaQuestionsEndpoint(client);
  }
  this.client = client;
}

BankMfaQuestionsEndpoint.prototype = _.extend(BankMfaQuestionsEndpoint.prototype, {

});

module.exports = BankMfaQuestionsEndpoint;
