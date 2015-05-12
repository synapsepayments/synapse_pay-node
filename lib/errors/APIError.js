'use strict';

var _ = require('lodash');

var SynapsePayError = require('./SynapsePayError');

function APIError(message, apiMethod) {
  if(!(this instanceof APIError)) {
    return new APIError(message, apiMethod);
  }

  this.message = message;
  this.apiMethod = apiMethod;
  this.stack = (new Error(this.message)).stack;
  try {
    this.json = JSON.parse(this.message);
  } catch(error) {
  }
}

APIError.prototype = _.extend(Object.create(SynapsePayError.prototype), {

})

module.exports = APIError;
