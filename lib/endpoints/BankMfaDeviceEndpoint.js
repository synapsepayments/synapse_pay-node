'use strict';

var _ = require('lodash');
var APIMethod = require('../apibits/APIMethod');
var APIResource = require('../apibits/APIResource');
var APIList = require('../apibits/APIList');
var Client = require('../Client');

function BankMfaDeviceEndpoint(client) {
  if(!(this instanceof BankMfaDeviceEndpoint)) {
    return new BankMfaDeviceEndpoint(client);
  }
  this.client = client;
}

BankMfaDeviceEndpoint.prototype = _.extend(BankMfaDeviceEndpoint.prototype, {
  
  answer: function(access_token, bank, mfa, params, headers, callback) {
    var mArgs = APIResource.prepArgs(arguments, BankMfaDeviceEndpoint.prototype.answer);
    var method = new APIMethod("post", "/bank/mfa", mArgs, this, function(json) {
      return APIList.construct('Bank', json.banks, this);
    });
    return this.client.execute(method);
  },

});

module.exports = BankMfaDeviceEndpoint;
