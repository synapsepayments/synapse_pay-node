'use strict';

var _ = require('lodash');
var APIMethod = require('../apibits/APIMethod');
var APIResource = require('../apibits/APIResource');
var APIList = require('../apibits/APIList');
var Client = require('../Client');

function MassPay(json, method, client) {
  if(!(this instanceof MassPay)) {
    return new MassPay(json, method, client);
  }
  _.extend(this, new APIResource(json, method, client));
}

MassPay = _.extend(MassPay, {

});

MassPay.prototype = _.extend(MassPay.prototype, APIResource.prototype, {
  
  cancel: function(params, headers, callback) {
    var mArgs = APIResource.prepArgs(arguments, MassPay.prototype.cancel);
    mArgs.params = ParamsBuilder.merge({
      id: this.id,
    }, mArgs.params);
    var method = new APIMethod("post", "/masspay/cancel", mArgs, this, function(json) {
      return APIList.construct('MassPay', json.mass_pays, this);
    });
    return this.client.execute(method);
  },

});

module.exports = MassPay;
