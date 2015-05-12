'use strict';

var _ = require('lodash');
var APIMethod = require('../apibits/APIMethod');
var APIResource = require('../apibits/APIResource');
var APIList = require('../apibits/APIList');
var Client = require('../Client');

function BankMfaQuestions(json, method, client) {
  if(!(this instanceof BankMfaQuestions)) {
    return new BankMfaQuestions(json, method, client);
  }
  _.extend(this, new APIResource(json, method, client));
}

BankMfaQuestions = _.extend(BankMfaQuestions, {

});

BankMfaQuestions.prototype = _.extend(BankMfaQuestions.prototype, APIResource.prototype, {
  
  answer: function(bank, mfa, params, headers, callback) {
    var mArgs = APIResource.prepArgs(arguments, BankMfaQuestions.prototype.answer);
    mArgs.params = ParamsBuilder.merge({
      access_token: this.accessToken,
    }, mArgs.params);
    var method = new APIMethod("post", "/bank/mfa", mArgs, this, function(json) {
      return APIList.construct('Bank', json.banks, this);
    });
    return this.client.execute(method);
  },

});

module.exports = BankMfaQuestions;
