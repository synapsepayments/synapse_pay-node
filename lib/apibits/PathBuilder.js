'use strict';

var _ = require('lodash');

function PathBuilder(path, instance, params) {
  instance = (typeof instance === 'undefined') ? {} : instance;

  if(path.indexOf(":") >= 0) {
    var match = [];
    while(match = path.match(/:([^\/&?]*)/)) {
      var value = determineValue(match[1], instance, params);
      path = path.substring(0, match.index) + value + path.substring(match.index + match[1].length + 1);
    }
  }
  return path;
}

function determineValue(match, instance, params) {
  var ret = instance[match] || params[match];
  if(ret == null) {
    // TODO(jon): Throw an error here.
  }
  return ret;
}

module.exports = PathBuilder;
