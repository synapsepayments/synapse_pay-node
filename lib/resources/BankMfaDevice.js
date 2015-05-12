'use strict';

var _ = require('lodash');
var APIMethod = require('../apibits/APIMethod');
var APIResource = require('../apibits/APIResource');
var APIList = require('../apibits/APIList');
var Client = require('../Client');

function BankMfaDevice(json, method, client) {
  if(!(this instanceof BankMfaDevice)) {
    return new BankMfaDevice(json, method, client);
  }
  _.extend(this, new APIResource(json, method, client));
}

BankMfaDevice = _.extend(BankMfaDevice, {

});

BankMfaDevice.prototype = _.extend(BankMfaDevice.prototype, APIResource.prototype, {
  
  answer: function(bank, mfa, params, headers, callback) {
    var mArgs = APIResource.prepArgs(arguments, BankMfaDevice.prototype.answer);
    mArgs.params = ParamsBuilder.merge({
      access_token: this.accessToken,
    }, mArgs.params);
    var method = new APIMethod("post", "/bank/mfa", mArgs, this, function(json) {
      return APIList.construct('Bank', json.banks, this);
    });
    return this.client.execute(method);
  },

});

module.exports = BankMfaDevice;
