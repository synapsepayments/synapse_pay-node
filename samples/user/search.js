'use strict';

var SynapsePay = require('../../lib/SynapsePay');
var _ = require('lodash');

// Make sure we are running in sandbox
SynapsePay.apiBase = SynapsePay.apiSandbox;
SynapsePay.clientId = "4528d2e0a2988064d8ac";
SynapsePay.clientSecret = "dcbf52b16040c94a35f345b7e2c285f936d673c9";
SynapsePay.User.login("3ac38d63db58466982fe6f871c48f1", "TestTest123$").then(function(client) {
  // Search for users

  // With a promise
  client.users.search("test").then(function(users) {
    _.each(users.data, function(user) {
      console.log(user);
    });
  }).catch(function(err) {
    console.log("Got an error in UserEndpoint#search.");
    console.log(err);
  });

  // With a callback
  client.users.search("test", function(users, err) {
    if(err) {
      console.log("Got an error in UserEndpoint#search.");
      console.log(err);
    } else {
      _.each(users.data, function(user) {
        console.log(user);
      });
    }
  });

}).catch(function(e) {
  console.log("Got an error when attempting to log in.");
  console.log(e);
});
