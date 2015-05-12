'use strict';

var _ = require('lodash');

function APIClient(headers, params) {
  if(!(this instanceof APIClient)) {
    return new APIClient(headers, params);
  }

  this.refresh_from(headers, params);
}

APIClient.prototype = _.extend(APIClient.prototype, {
  execute: function(apiMethod) {
    apiMethod.headers = _.extend(apiMethod.headers, this.headers);
    apiMethod.params = _.extend(apiMethod.params, this.params);
    apiMethod.client = this;
    return apiMethod.execute();
  },

  refresh_from: function(headers, params) {
    this.headers = headers;
    this.params = params;
    return this;
  }
});

module.exports = APIClient;
