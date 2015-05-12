'use strict';

var _ = require('lodash');
var request = require('request');

function Request(method, url, params, headers, successCb, errorCb) {
  _deepCleanse(params);

  var opts = {
    method: method.toUpperCase(),
    url: url,
    headers: headers
  };
  if(method == "GET" || method == "DELETE") {
    opts.qs = params;
  } else {
    if(headers["Content-Type"] == "application/json") {
      opts.body = JSON.stringify(params);
    } else {
      opts.form = params;
    }
  }
  request(opts, _requestHandler(successCb, errorCb));
}

function _requestHandler(successCb, errorCb) {
  return function(error, response, body) {
    if(!error && response.statusCode >= 200 && response.statusCode < 300) {
      successCb(body, response.statusCode);
    } else {
      errorCb(body, response.statusCode);
    }
  };
}

function _deepCleanse(obj) {
  if(typeof obj === 'object') {
    _.each(_.keys(obj), function(key) {
      if(obj[key] === null) {
        delete obj[key];
      } else {
        _deepCleanse(obj[key]);
      }
    })
  } else if(typeof obj === 'array') {
    _.each(obj, _deepCleanse);
  } else {
    return;
  }
}


module.exports = Request;
