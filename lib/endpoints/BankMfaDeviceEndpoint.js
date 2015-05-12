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

});

module.exports = BankMfaDeviceEndpoint;
