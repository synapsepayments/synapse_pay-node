'use strict';

var _ = require('lodash');
var APIMethod = require('../apibits/APIMethod');
var APIResource = require('../apibits/APIResource');
var APIList = require('../apibits/APIList');
var Client = require('../Client');

function WithdrawalEndpoint(client) {
  if(!(this instanceof WithdrawalEndpoint)) {
    return new WithdrawalEndpoint(client);
  }
  this.client = client;
}

WithdrawalEndpoint.prototype = _.extend(WithdrawalEndpoint.prototype, {
  
  all: function(params, headers, callback) {
    var mArgs = APIResource.prepArgs(arguments, WithdrawalEndpoint.prototype.all);
    var method = new APIMethod("post", "/withdraw/show", mArgs, this, function(json) {
      return APIList.construct('Withdrawal', json.withdraws, this);
    });
    return this.client.execute(method);
  },

  create: function(params, headers, callback) {
    var mArgs = APIResource.prepArgs(arguments, WithdrawalEndpoint.prototype.create);
    var method = new APIMethod("post", "/withdraw/add", mArgs, this, function(json) {
      return APIResource.construct('Withdrawal', json.withdrawal, this);
    });
    return this.client.execute(method);
  },

});

module.exports = WithdrawalEndpoint;
