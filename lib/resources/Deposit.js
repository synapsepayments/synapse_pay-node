'use strict';

var _ = require('lodash');
var APIMethod = require('../apibits/APIMethod');
var APIResource = require('../apibits/APIResource');
var APIList = require('../apibits/APIList');
var Client = require('../Client');

function Deposit(json, method, client) {
  if(!(this instanceof Deposit)) {
    return new Deposit(json, method, client);
  }
  _.extend(this, new APIResource(json, method, client));
}

Deposit = _.extend(Deposit, {

});

Deposit.prototype = _.extend(Deposit.prototype, APIResource.prototype, {

});

module.exports = Deposit;
