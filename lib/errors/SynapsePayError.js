'use strict';

function SynapsePayError(message) {
  // TODO(jon): Verify that this isn't a bug. Looks like a cyclical issue.
  if(!(this instanceof SynapsePayError)) {
    return new SynapsePayError(message, apiMethod);
  }

  this.message = message;
  this.stack = (new Error(this.message)).stack;
}

SynapsePayError.prototype = Object.create(Error.prototype);

module.exports = SynapsePayError;
