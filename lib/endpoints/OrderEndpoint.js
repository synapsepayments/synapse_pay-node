'use strict';

var _ = require('lodash');
var APIMethod = require('../apibits/APIMethod');
var APIResource = require('../apibits/APIResource');
var APIList = require('../apibits/APIList');
var Client = require('../Client');

function OrderEndpoint(client) {
  if(!(this instanceof OrderEndpoint)) {
    return new OrderEndpoint(client);
  }
  this.client = client;
}

OrderEndpoint.prototype = _.extend(OrderEndpoint.prototype, {
  
  create: function(params, headers, callback) {
    var mArgs = APIResource.prepArgs(arguments, OrderEndpoint.prototype.create);
    var method = new APIMethod("post", "/order/add", mArgs, this, function(json) {
      return APIResource.construct('Order', json.order, this);
    });
    return this.client.execute(method);
  },

  poll: function(order_id, params, headers, callback) {
    var mArgs = APIResource.prepArgs(arguments, OrderEndpoint.prototype.poll);
    var method = new APIMethod("post", "/order/poll", mArgs, this, function(json) {
      return APIResource.construct('Order', json.order, this);
    });
    return this.client.execute(method);
  },

  recent: function(params, headers, callback) {
    var mArgs = APIResource.prepArgs(arguments, OrderEndpoint.prototype.recent);
    var method = new APIMethod("post", "/order/recent", mArgs, this, function(json) {
      return APIList.construct('Order', json.orders, this);
    });
    return this.client.execute(method);
  },

  update: function(order_id, params, headers, callback) {
    var mArgs = APIResource.prepArgs(arguments, OrderEndpoint.prototype.update);
    var method = new APIMethod("post", "/order/update", mArgs, this, function(json) {
      return APIResource.construct('Order', json.order, this);
    });
    return this.client.execute(method);
  },

  void: function(order_id, params, headers, callback) {
    var mArgs = APIResource.prepArgs(arguments, OrderEndpoint.prototype.void);
    var method = new APIMethod("post", "/order/void", mArgs, this, function(json) {
      return APIResource.construct('Order', json.order, this);
    });
    return this.client.execute(method);
  },

});

module.exports = OrderEndpoint;
