'use strict';

var SynapsePay = require('../../lib/SynapsePay');
var _ = require('lodash');

// Make sure we are running in sandbox
SynapsePay.apiBase = SynapsePay.apiSandbox;
SynapsePay.clientId = "4528d2e0a2988064d8ac";
SynapsePay.clientSecret = "dcbf52b16040c94a35f345b7e2c285f936d673c9";
SynapsePay.User.login("3ac38d63db58466982fe6f871c48f1", "TestTest123$").then(function(client) {

  // With a promise
  client.deposits.create({
    amount: "10",
    bank_id: "2174",
  }).then(function(deposit) {
    console.log(deposit);
  
  }).catch(function(err) {
    console.log("Got an error in DepositEndpoint#create.");
    console.log(err);
  });

  // With a callback
  client.deposits.create({
    amount: "10",
    bank_id: "2174",
  }, function(deposit, err) {
    if(err) {
      console.log("Got an error in DepositEndpoint#create.");
      console.log(err);
    } else {
      console.log(deposit);
  
    }
  });

}).catch(function(e) {
  console.log("Got an error when attempting to log in.");
  console.log(e);
});
