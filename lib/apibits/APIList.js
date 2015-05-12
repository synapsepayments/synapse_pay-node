'use strict';

var _ = require('lodash');

function APIList(json, apiMethod, klass, client) {
  if(!(this instanceof APIList)) {
    return new APIList(json, apiMethod, klass, client);
  }
  this.refresh_from(json, apiMethod, klass, client);
}

APIList = _.extend(APIList, {
  construct: function(klass, json, method) {
    if(typeof klass === 'string') {
      klass = require('../resources/' + klass);
    }
    return new APIList(json, method, klass, method.client);
  },
});

APIList.prototype = _.extend(APIList.prototype, {
  refresh_from: function(json, apiMethod, klass, client) {
    if(typeof klass === 'string') {
      klass = require('../resources/' + klass);
    }
    this.apiMethod = apiMethod;
    this.klass = klass;
    this.client = client;

    if(Array.isArray(json)) {
      json = {
        data: json
      };
    }
    var instances = new Array();
    _.each(json.data, function(instanceJson) {
      instances.push(new klass(instanceJson, apiMethod, client));
    });
    json.data = instances;
    return _.extend(this, json);
  }
});

module.exports = APIList;
