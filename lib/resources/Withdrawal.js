'use strict';

var _ = require('lodash');
var APIMethod = require('../apibits/APIMethod');
var APIResource = require('../apibits/APIResource');
var APIList = require('../apibits/APIList');
var Client = require('../Client');

function Withdrawal(json, method, client) {
  if(!(this instanceof Withdrawal)) {
    return new Withdrawal(json, method, client);
  }
  _.extend(this, new APIResource(json, method, client));
}

Withdrawal = _.extend(Withdrawal, {

});

Withdrawal.prototype = _.extend(Withdrawal.prototype, APIResource.prototype, {

});

module.exports = Withdrawal;
