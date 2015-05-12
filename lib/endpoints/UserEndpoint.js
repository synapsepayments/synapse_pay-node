'use strict';

var _ = require('lodash');
var APIMethod = require('../apibits/APIMethod');
var APIResource = require('../apibits/APIResource');
var APIList = require('../apibits/APIList');
var Client = require('../Client');

function UserEndpoint(client) {
  if(!(this instanceof UserEndpoint)) {
    return new UserEndpoint(client);
  }
  this.client = client;
}

UserEndpoint.prototype = _.extend(UserEndpoint.prototype, {
  
  retrieve: function(params, headers, callback) {
    var mArgs = APIResource.prepArgs(arguments, UserEndpoint.prototype.retrieve);
    var method = new APIMethod("post", "/user/show", mArgs, this, function(json) {
      return APIResource.construct('User', json.user, this);
    });
    return this.client.execute(method);
  },

  search: function(query, params, headers, callback) {
    var mArgs = APIResource.prepArgs(arguments, UserEndpoint.prototype.search);
    var method = new APIMethod("post", "/user/customers", mArgs, this, function(json) {
      return APIList.construct('User', json.customers, this);
    });
    return this.client.execute(method);
  },

  update: function(params, headers, callback) {
    var mArgs = APIResource.prepArgs(arguments, UserEndpoint.prototype.update);
    var method = new APIMethod("post", "/user/edit", mArgs, this, function(json) {
      return APIResource.construct('User', json.user, this);
    });
    return this.client.execute(method);
  },

});

module.exports = UserEndpoint;
