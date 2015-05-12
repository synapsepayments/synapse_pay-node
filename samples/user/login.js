'use strict';

var SynapsePay = require('../../lib/SynapsePay');
var _ = require('lodash');

// Make sure we are running in sandbox
SynapsePay.apiBase = SynapsePay.apiSandbox;
SynapsePay.clientId = "4528d2e0a2988064d8ac";
SynapsePay.clientSecret = "dcbf52b16040c94a35f345b7e2c285f936d673c9";

// With a promise
SynapsePay.User.login("3ac38d63db58466982fe6f871c48f1", "TestTest123$").then(function(client) {
  console.log(client);

}).catch(function(err) {
  console.log("Got an error in User#login.");
  console.log(err);
});

// With a callback
SynapsePay.User.login("3ac38d63db58466982fe6f871c48f1", "TestTest123$", function(client, err) {
  if(err) {
    console.log("Got an error in User#login.");
    console.log(err);
  } else {
    console.log(client);

  }
});
