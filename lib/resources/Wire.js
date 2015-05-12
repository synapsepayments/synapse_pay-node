'use strict';

var _ = require('lodash');
var APIMethod = require('../apibits/APIMethod');
var APIResource = require('../apibits/APIResource');
var APIList = require('../apibits/APIList');
var Client = require('../Client');

function Wire(json, method, client) {
  if(!(this instanceof Wire)) {
    return new Wire(json, method, client);
  }
  _.extend(this, new APIResource(json, method, client));
}

Wire = _.extend(Wire, {

});

Wire.prototype = _.extend(Wire.prototype, APIResource.prototype, {

});

module.exports = Wire;
