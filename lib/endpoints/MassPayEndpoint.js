'use strict';

var _ = require('lodash');
var APIMethod = require('../apibits/APIMethod');
var APIResource = require('../apibits/APIResource');
var APIList = require('../apibits/APIList');
var Client = require('../Client');

function MassPayEndpoint(client) {
  if(!(this instanceof MassPayEndpoint)) {
    return new MassPayEndpoint(client);
  }
  this.client = client;
}

MassPayEndpoint.prototype = _.extend(MassPayEndpoint.prototype, {
  
  all: function(params, headers, callback) {
    var mArgs = APIResource.prepArgs(arguments, MassPayEndpoint.prototype.all);
    var method = new APIMethod("post", "/masspay/show", mArgs, this, function(json) {
      return APIList.construct('MassPay', json.mass_pays, this);
    });
    return this.client.execute(method);
  },

  cancel: function(id, params, headers, callback) {
    var mArgs = APIResource.prepArgs(arguments, MassPayEndpoint.prototype.cancel);
    var method = new APIMethod("post", "/masspay/cancel", mArgs, this, function(json) {
      return APIList.construct('MassPay', json.mass_pays, this);
    });
    return this.client.execute(method);
  },

  create: function(params, headers, callback) {
    var mArgs = APIResource.prepArgs(arguments, MassPayEndpoint.prototype.create);
    var method = new APIMethod("post", "/masspay/add", mArgs, this, function(json) {
      return APIList.construct('MassPay', json.mass_pays, this);
    });
    return this.client.execute(method);
  },

});

module.exports = MassPayEndpoint;
