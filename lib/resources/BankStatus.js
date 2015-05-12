'use strict';

var _ = require('lodash');
var APIMethod = require('../apibits/APIMethod');
var APIResource = require('../apibits/APIResource');
var APIList = require('../apibits/APIList');
var Client = require('../Client');

function BankStatus(json, method, client) {
  if(!(this instanceof BankStatus)) {
    return new BankStatus(json, method, client);
  }
  _.extend(this, new APIResource(json, method, client));
}

BankStatus = _.extend(BankStatus, {

});

BankStatus.prototype = _.extend(BankStatus.prototype, APIResource.prototype, {

});

module.exports = BankStatus;
