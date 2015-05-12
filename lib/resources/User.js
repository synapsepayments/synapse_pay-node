'use strict';

var _ = require('lodash');
var APIMethod = require('../apibits/APIMethod');
var APIResource = require('../apibits/APIResource');
var APIList = require('../apibits/APIList');
var Client = require('../Client');

function User(json, method, client) {
  if(!(this instanceof User)) {
    return new User(json, method, client);
  }
  _.extend(this, new APIResource(json, method, client));
}

User = _.extend(User, {
  
  create: function(params, headers, callback) {
    var mArgs = APIResource.prepArgs(arguments, User.create);
    var method = new APIMethod("post", "/user/create", mArgs, this, function(json) {
      return (new Client()).refresh_from(json);
    });
    return method.execute();
  },

  login: function(username, password, params, headers, callback) {
    var mArgs = APIResource.prepArgs(arguments, User.login);
    var method = new APIMethod("post", "/user/login", mArgs, this, function(json) {
      return (new Client()).refresh_from(json);
    });
    return method.execute();
  },

  refreshAccess: function(refresh_token, params, headers, callback) {
    var mArgs = APIResource.prepArgs(arguments, User.refreshAccess);
    var method = new APIMethod("post", "/user/refresh", mArgs, this, function(json) {
      return (new Client()).refresh_from(json);
    });
    return method.execute();
  },

});

User.prototype = _.extend(User.prototype, APIResource.prototype, {
  
  refresh: function(params, headers, callback) {
    var mArgs = APIResource.prepArgs(arguments, User.prototype.refresh);
    var self = this;
    var method = new APIMethod("post", "/user/show", mArgs, this, function(json) {
      return APIResource.construct(self, json, this);
    });
    return this.client.execute(method);
  },

  update: function(params, headers, callback) {
    var mArgs = APIResource.prepArgs(arguments, User.prototype.update);
    var self = this;
    var method = new APIMethod("post", "/user/edit", mArgs, this, function(json) {
      return APIResource.construct(self, json, this);
    });
    return this.client.execute(method);
  },

});

module.exports = User;
