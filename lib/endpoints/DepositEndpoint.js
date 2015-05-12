'use strict';

var _ = require('lodash');
var APIMethod = require('../apibits/APIMethod');
var APIResource = require('../apibits/APIResource');
var APIList = require('../apibits/APIList');
var Client = require('../Client');

function DepositEndpoint(client) {
  if(!(this instanceof DepositEndpoint)) {
    return new DepositEndpoint(client);
  }
  this.client = client;
}

DepositEndpoint.prototype = _.extend(DepositEndpoint.prototype, {
  
  all: function(params, headers, callback) {
    var mArgs = APIResource.prepArgs(arguments, DepositEndpoint.prototype.all);
    var method = new APIMethod("post", "/deposit/show", mArgs, this, function(json) {
      return APIList.construct('Deposit', json.deposits, this);
    });
    return this.client.execute(method);
  },

  create: function(params, headers, callback) {
    var mArgs = APIResource.prepArgs(arguments, DepositEndpoint.prototype.create);
    var method = new APIMethod("post", "/deposit/add", mArgs, this, function(json) {
      return APIResource.construct('Deposit', json.deposit, this);
    });
    return this.client.execute(method);
  },

  micro: function(params, headers, callback) {
    var mArgs = APIResource.prepArgs(arguments, DepositEndpoint.prototype.micro);
    var method = new APIMethod("post", "/deposit/micro", mArgs, this, function(json) {
      return APIList.construct('Deposit', json.deposits, this);
    });
    return this.client.execute(method);
  },

});

module.exports = DepositEndpoint;
