'use strict';

var _ = require('lodash');
var APIMethod = require('../apibits/APIMethod');
var APIResource = require('../apibits/APIResource');
var APIList = require('../apibits/APIList');
var Client = require('../Client');

function CardEndpoint(client) {
  if(!(this instanceof CardEndpoint)) {
    return new CardEndpoint(client);
  }
  this.client = client;
}

CardEndpoint.prototype = _.extend(CardEndpoint.prototype, {
  
  all: function(params, headers, callback) {
    var mArgs = APIResource.prepArgs(arguments, CardEndpoint.prototype.all);
    var method = new APIMethod("post", "/card/show", mArgs, this, function(json) {
      return APIList.construct('Card', json.cards, this);
    });
    return this.client.execute(method);
  },

  create: function(params, headers, callback) {
    var mArgs = APIResource.prepArgs(arguments, CardEndpoint.prototype.create);
    var method = new APIMethod("post", "/card/add", mArgs, this, function(json) {
      return APIResource.construct('Card', json.card, this);
    });
    return this.client.execute(method);
  },

  update: function(id, params, headers, callback) {
    var mArgs = APIResource.prepArgs(arguments, CardEndpoint.prototype.update);
    var method = new APIMethod("post", "/card/edit", mArgs, this, function(json) {
      return APIResource.construct('Card', json.card, this);
    });
    return this.client.execute(method);
  },

});

module.exports = CardEndpoint;
