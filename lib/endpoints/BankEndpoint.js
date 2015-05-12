'use strict';

var _ = require('lodash');
var APIMethod = require('../apibits/APIMethod');
var APIResource = require('../apibits/APIResource');
var APIList = require('../apibits/APIList');
var Client = require('../Client');

function BankEndpoint(client) {
  if(!(this instanceof BankEndpoint)) {
    return new BankEndpoint(client);
  }
  this.client = client;
}

BankEndpoint.prototype = _.extend(BankEndpoint.prototype, {
  
  add: function(params, headers, callback) {
    var mArgs = APIResource.prepArgs(arguments, BankEndpoint.prototype.add);
    var method = new APIMethod("post", "/bank/add", mArgs, this, function(json) {
      return APIResource.construct('Bank', json.bank, this);
    });
    return this.client.execute(method);
  },

  all: function(params, headers, callback) {
    var mArgs = APIResource.prepArgs(arguments, BankEndpoint.prototype.all);
    var method = new APIMethod("post", "/bank/show", mArgs, this, function(json) {
      return APIList.construct('Bank', json.banks, this);
    });
    return this.client.execute(method);
  },

  link: function(params, headers, callback) {
    var mArgs = APIResource.prepArgs(arguments, BankEndpoint.prototype.link);
    var method = new APIMethod("post", "/bank/login", mArgs, this, function(json) {
      if(json.is_mfa && json.response.type === "questions") {
        return APIResource.construct('BankMfaQuestions', json.response, this);
      } else if(json.is_mfa && json.response.type === "device") {
        return APIResource.construct('BankMfaDevice', json.response, this);
      } else {
        return APIList.construct('Bank', json.banks, this);
      };
    });
    return this.client.execute(method);
  },

  remove: function(bank_id, params, headers, callback) {
    var mArgs = APIResource.prepArgs(arguments, BankEndpoint.prototype.remove);
    var method = new APIMethod("post", "/bank/delete", mArgs, this, function(json) {
      return json;
    });
    return this.client.execute(method);
  },

  retrieve: function(id, params, headers, callback) {
    var mArgs = APIResource.prepArgs(arguments, BankEndpoint.prototype.retrieve);
    var method = new APIMethod("post", "/bank/refresh", mArgs, this, function(json) {
      return APIList.construct('Bank', json.banks, this);
    });
    return this.client.execute(method);
  },

});

module.exports = BankEndpoint;
