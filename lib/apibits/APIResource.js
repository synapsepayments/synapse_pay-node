'use strict';

var _ = require('lodash');

var Util = require('./Util');

function APIResource(json, apiMethod, client) {
  if(!(this instanceof APIResource)) {
    return new APIResource(json, apiMethod, client);
  }
  this.refresh_from(json, apiMethod, client);
}

APIResource = _.extend(APIResource, {
  determineArgs: function(params, headers, callback) {
    if(typeof params === 'function') {
      callback = params;
      params = {};
      headers = {}
    } else if(typeof headers === 'function') {
      callback = headers;
      headers = {};
    }
    return {
      params: params,
      headers: headers,
      callback: callback
    };
  },

  // This should get cleaned up eventually.. but it works for now.
  prepArgs: function(args, func) {
    var argNames = Util.getArgNames(func);

    var temp = {};
    _.each(args, function(arg, index) {
      temp[argNames[index]] = arg;
    });

    // Find the callback (in case args were missing).
    var callback = temp.callback;
    if(!callback) {
      var cbKey = _.findLastKey(temp, function(arg) {
        return (typeof arg === 'function');
      });
      callback = temp[cbKey];
      delete temp[cbKey];
    } else {
      delete temp.callback;
    }

    // Pull out the params & headers.
    // Merge the rest into the params.
    var params = temp.params || {};
    delete temp.params;
    var headers = temp.headers || {};
    delete temp.headers;
    params = _.extend(temp, params);

    return {
      params: params,
      headers: headers,
      callback: callback
    }
  },

  construct: function(klass, json, method) {
    if(typeof klass === 'string') {
      klass = require('../resources/' + klass);
    }
    return new klass(json, method, method.client);
  },

});

APIResource.prototype = _.extend(APIResource.prototype, {
  // This *DOES NOT* clear any existing data.
  refresh_from: function(json, apiMethod, client) {
    this.apiMethod = apiMethod;
    this.client = client;

    if(typeof json === 'string') {
      json = { id: json };
    }
    return _.extend(this, json);
  }
});

module.exports = APIResource;
