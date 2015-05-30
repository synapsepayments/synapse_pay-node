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
  
  answer: function(access_token, bank, mfa, params, headers, callback) {
    var mArgs = APIResource.prepArgs(arguments, BankMfaQuestionsEndpoint.prototype.answer);
    var method = new APIMethod("post", "/bank/mfa", mArgs, this, function(json) {
      return APIList.construct('Bank', json.banks, this);
    });
    return this.client.execute(method);
  },

});

module.exports = BankMfaQuestionsEndpoint;
