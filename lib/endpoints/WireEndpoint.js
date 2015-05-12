'use strict';

var _ = require('lodash');
var APIMethod = require('../apibits/APIMethod');
var APIResource = require('../apibits/APIResource');
var APIList = require('../apibits/APIList');
var Client = require('../Client');

function WireEndpoint(client) {
  if(!(this instanceof WireEndpoint)) {
    return new WireEndpoint(client);
  }
  this.client = client;
}

WireEndpoint.prototype = _.extend(WireEndpoint.prototype, {
  
  allIncoming: function(params, headers, callback) {
    var mArgs = APIResource.prepArgs(arguments, WireEndpoint.prototype.allIncoming);
    var method = new APIMethod("post", "/wirein/show", mArgs, this, function(json) {
      return APIList.construct('Wire', json.wires, this);
    });
    return this.client.execute(method);
  },

  allOutgoing: function(params, headers, callback) {
    var mArgs = APIResource.prepArgs(arguments, WireEndpoint.prototype.allOutgoing);
    var method = new APIMethod("post", "/wireout/show", mArgs, this, function(json) {
      return APIList.construct('Wire', json.wires, this);
    });
    return this.client.execute(method);
  },

  createIncoming: function(params, headers, callback) {
    var mArgs = APIResource.prepArgs(arguments, WireEndpoint.prototype.createIncoming);
    var method = new APIMethod("post", "/wirein/add", mArgs, this, function(json) {
      return APIResource.construct('Wire', json.wire, this);
    });
    return this.client.execute(method);
  },

  createOutgoing: function(params, headers, callback) {
    var mArgs = APIResource.prepArgs(arguments, WireEndpoint.prototype.createOutgoing);
    var method = new APIMethod("post", "/wireout/add", mArgs, this, function(json) {
      return APIResource.construct('Wire', json.wire, this);
    });
    return this.client.execute(method);
  },

});

module.exports = WireEndpoint;
