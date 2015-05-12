'use strict';

var SynapsePay = require('../../lib/SynapsePay');
var _ = require('lodash');

// Make sure we are running in sandbox
SynapsePay.apiBase = SynapsePay.apiSandbox;
SynapsePay.clientId = "4528d2e0a2988064d8ac";
SynapsePay.clientSecret = "dcbf52b16040c94a35f345b7e2c285f936d673c9";

// Create a SynapsePay user account

// With a promise
SynapsePay.User.create({
  email: "test-user-321@synapsepay.com",
  fullname: "Test Account",
  ip_address: "11.111.11.11",
  phonenumber: "123456799",
}).then(function(client) {
  console.log(client);

}).catch(function(err) {
  console.log("Got an error in User#create.");
  console.log(err);
});

// With a callback
SynapsePay.User.create({
  email: "test-user-321@synapsepay.com",
  fullname: "Test Account",
  ip_address: "11.111.11.11",
  phonenumber: "123456799",
}, function(client, err) {
  if(err) {
    console.log("Got an error in User#create.");
    console.log(err);
  } else {
    console.log(client);

  }
});

// Use force_create=no if you lose the access_token and refresh_token for an account.

// With a promise
SynapsePay.User.create({
  email: "test-user-321@synapsepay.com",
  force_create: "no",
  fullname: "Test Account",
  ip_address: "11.111.11.11",
  phonenumber: "123456799",
}).then(function(client) {
  console.log(client);

}).catch(function(err) {
  console.log("Got an error in User#create.");
  console.log(err);
});

// With a callback
SynapsePay.User.create({
  email: "test-user-321@synapsepay.com",
  force_create: "no",
  fullname: "Test Account",
  ip_address: "11.111.11.11",
  phonenumber: "123456799",
}, function(client, err) {
  if(err) {
    console.log("Got an error in User#create.");
    console.log(err);
  } else {
    console.log(client);

  }
});
