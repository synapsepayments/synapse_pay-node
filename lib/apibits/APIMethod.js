'use strict';

var _ = require('lodash');
var Promise = require('bluebird');

var APIList = require('./APIList');
var APIError = require('../errors/APIError');
var Request = require('./Request');
var ParamsBuilder = require('./ParamsBuilder');
var HeadersBuilder = require('./HeadersBuilder');
var PathBuilder = require('./PathBuilder');

function APIMethod(method, path, pHandCb, instance, constructCb) {
  if(!(this instanceof APIMethod)) {
    return new APIMethod(method, path, pHandCb, instance, constructCb, apiKey, apiBase);
  }

  // Do this here (not before) otherwise circuluar deps will screw you :\
  // Long term this should likely be fixed by having instances of everything.
  var SynapsePay = require('../SynapsePay');
  this.apiKey = (typeof apiKey === 'undefined') ? SynapsePay.apiKey : apiKey;
  this.apiBase = (typeof apiBase === 'undefined') ? SynapsePay.apiBase : apiBase;

  this.method = method.toUpperCase();
  this.params = ParamsBuilder(pHandCb.params);
  this.path = PathBuilder(path, instance, this.params);
  this.headers = HeadersBuilder(pHandCb.headers);

  this.callback = pHandCb.callback;
  if(constructCb && typeof constructCb === 'function') {
    this.constructCb = constructCb;
  } else {
    this.constructCb = function(json) { return json; }
  }
}

APIMethod.prototype = _.extend(APIMethod.prototype, {
  onSuccess: function(deferred) {
    return function(body, code) {
      this.response = { body: body, code: code };
      if(typeof body === 'string') {
        this.parseResponse();
      } else {
        this.response.json = body;
      }

      if(!this.error) {
        if(!this.response.json.success) {
          this.error = new APIError(this.response.json, this);
        }
      }

      if(this.error) {
        deferred.reject(this.error);
      } else {
        deferred.resolve(this.constructCb(this.response.json));
      }
    }.bind(this);
  },

  onError: function(deferred) {
    return function(body, code) {
      this.response = { body: body, code: code };
      this.error = new APIError(body, this);
      deferred.reject(this.error);
    }.bind(this);
  },

  construct: function(klass, json) {
    if(typeof klass === 'string') {
      klass = require('../resources/' + klass);
    }
    return new klass(json, this, this.client);
  },

  constructList: function(klass, json) {
    if(typeof klass === 'string') {
      klass = require('../resources/' + klass);
    }
    return new APIList(json, this, klass, this.client);
  },

  url: function() {
    return this.apiBase + "" + this.path;
  },

  parseResponse: function() {
    try {
      this.response.json = JSON.parse(this.response.body);
      return this.response.json;
    } catch(jsonError) {
      this.error = new APIError("Invalid response from server. Not JSON parsable.", this);
      return this.error;
    }
  },

  createDeferred: function(callback) {
      var deferred = Promise.defer();

      if (callback) {
        // Callback, if provided, is a simply translated to Promise'esque:
        // (Ensure callback is called outside of promise stack)
        deferred.promise.then(function(res) {
          setTimeout(function(){ callback(res, null) }, 0);
        }, function(err) {
          setTimeout(function(){ callback(null, err); }, 0);
        });
      }

      return deferred;
  },

  // Issue is with the promise - if i dont provide a CB the new klass() code is never run.


  execute: function() {
    var deferred = this.createDeferred(this.callback);
    Request(this.method, this.url(), this.params, this.headers, this.onSuccess(deferred), this.onError(deferred));
    return deferred.promise;
  }
});

module.exports = APIMethod;
