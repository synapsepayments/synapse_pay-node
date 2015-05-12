'use strict';

var _ = require('lodash');
var APIMethod = require('../apibits/APIMethod');
var APIResource = require('../apibits/APIResource');
var APIList = require('../apibits/APIList');
var Client = require('../Client');

function Bank(json, method, client) {
  if(!(this instanceof Bank)) {
    return new Bank(json, method, client);
  }
  _.extend(this, new APIResource(json, method, client));
}

Bank = _.extend(Bank, {

});

Bank.prototype = _.extend(Bank.prototype, APIResource.prototype, {
  
  remove: function(params, headers, callback) {
    var mArgs = APIResource.prepArgs(arguments, Bank.prototype.remove);
    mArgs.params = ParamsBuilder.merge({
      bank_id: this.id,
    }, mArgs.params);
    var method = new APIMethod("post", "/bank/delete", mArgs, this, function(json) {
      return json;
    });
    return this.client.execute(method);
  },

});

module.exports = Bank;
