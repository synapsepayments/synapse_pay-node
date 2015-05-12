'use strict';

var _ = require('lodash');
var APIMethod = require('../apibits/APIMethod');
var APIResource = require('../apibits/APIResource');
var APIList = require('../apibits/APIList');
var Client = require('../Client');

function Card(json, method, client) {
  if(!(this instanceof Card)) {
    return new Card(json, method, client);
  }
  _.extend(this, new APIResource(json, method, client));
}

Card = _.extend(Card, {

});

Card.prototype = _.extend(Card.prototype, APIResource.prototype, {
  
  update: function(params, headers, callback) {
    var mArgs = APIResource.prepArgs(arguments, Card.prototype.update);
    mArgs.params = ParamsBuilder.merge({
      id: this.id,
    }, mArgs.params);
    var self = this;
    var method = new APIMethod("post", "/card/edit", mArgs, this, function(json) {
      return APIResource.construct(self, json, this);
    });
    return this.client.execute(method);
  },

});

module.exports = Card;
