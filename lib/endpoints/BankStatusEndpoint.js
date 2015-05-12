'use strict';

var _ = require('lodash');
var APIMethod = require('../apibits/APIMethod');
var APIResource = require('../apibits/APIResource');
var APIList = require('../apibits/APIList');
var Client = require('../Client');

function BankStatusEndpoint(client) {
  if(!(this instanceof BankStatusEndpoint)) {
    return new BankStatusEndpoint(client);
  }
  this.client = client;
}

BankStatusEndpoint.prototype = _.extend(BankStatusEndpoint.prototype, {
  
  all: function(params, headers, callback) {
    var mArgs = APIResource.prepArgs(arguments, BankStatusEndpoint.prototype.all);
    var method = new APIMethod("post", "/bankstatus/show", mArgs, this, function(json) {
      return APIList.construct('BankStatus', json.banks, this);
    });
    return this.client.execute(method);
  },

});

module.exports = BankStatusEndpoint;
