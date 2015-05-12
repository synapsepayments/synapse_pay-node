'use strict';

var _ = require('lodash');
var APIMethod = require('../apibits/APIMethod');
var APIResource = require('../apibits/APIResource');
var APIList = require('../apibits/APIList');
var Client = require('../Client');

function Order(json, method, client) {
  if(!(this instanceof Order)) {
    return new Order(json, method, client);
  }
  _.extend(this, new APIResource(json, method, client));
}

Order = _.extend(Order, {

});

Order.prototype = _.extend(Order.prototype, APIResource.prototype, {
  
  update: function(params, headers, callback) {
    var mArgs = APIResource.prepArgs(arguments, Order.prototype.update);
    mArgs.params = ParamsBuilder.merge({
      order_id: this.id,
    }, mArgs.params);
    var self = this;
    var method = new APIMethod("post", "/order/update", mArgs, this, function(json) {
      return APIResource.construct(self, json, this);
    });
    return this.client.execute(method);
  },

  void: function(params, headers, callback) {
    var mArgs = APIResource.prepArgs(arguments, Order.prototype.void);
    mArgs.params = ParamsBuilder.merge({
      order_id: this.id,
    }, mArgs.params);
    var self = this;
    var method = new APIMethod("post", "/order/void", mArgs, this, function(json) {
      return APIResource.construct(self, json, this);
    });
    return this.client.execute(method);
  },

});

module.exports = Order;
