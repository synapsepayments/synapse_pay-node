'use strict';

var SynapsePay = require('../../lib/SynapsePay');
var _ = require('lodash');

// Make sure we are running in sandbox
SynapsePay.apiBase = SynapsePay.apiSandbox;
SynapsePay.clientId = "4528d2e0a2988064d8ac";
SynapsePay.clientSecret = "dcbf52b16040c94a35f345b7e2c285f936d673c9";
SynapsePay.User.login("3ac38d63db58466982fe6f871c48f1", "TestTest123$").then(function(client) {
  // Link a bank account with an MFA Device

  // With a promise
  client.banks.link({
    bank: "Bank of America",
    password: "test1234",
    username: "synapse_code",
  }).then(function(mfaDevice) {
    console.log(mfaDevice);
    mfaDevice.answer("Bank of America", "test_answer").then(function(banks) {
      // do work with newly added bank.
    });

  }).catch(function(err) {
    console.log("Got an error in BankEndpoint#link.");
    console.log(err);
  });

  // With a callback
  client.banks.link({
    bank: "Bank of America",
    password: "test1234",
    username: "synapse_code",
  }, function(mfaDevice, err) {
    if(err) {
      console.log("Got an error in BankEndpoint#link.");
      console.log(err);
    } else {
      console.log(mfaDevice);

    }
  });

  // Link a bank account with MFA Questions

  // With a promise
  client.banks.link({
    bank: "Bank of America",
    password: "test1234",
    username: "synapse_good",
  }).then(function(mfaQuestions) {
    console.log(mfaQuestions);
    mfaQuestions.answer("Bank of America", "test_answer").then(function(banks) {
      // do work with newly added bank.
    });
  }).catch(function(err) {
    console.log("Got an error in BankEndpoint#link.");
    console.log(err);
  });

  // With a callback
  client.banks.link({
    bank: "Bank of America",
    password: "test1234",
    username: "synapse_good",
  }, function(mfaQuestions, err) {
    if(err) {
      console.log("Got an error in BankEndpoint#link.");
      console.log(err);
    } else {
      console.log(mfaQuestions);

    }
  });

  // Link a bank account without any MFA

  // With a promise
  client.banks.link({
    bank: "Bank of America",
    password: "test1234",
    username: "synapse_nomfa",
  }).then(function(mfaDevice) {
    _.each(mfaDevice.data, function(mfaDevice) {
      console.log(mfaDevice);
    });
  }).catch(function(err) {
    console.log("Got an error in BankEndpoint#link.");
    console.log(err);
  });

  // With a callback
  client.banks.link({
    bank: "Bank of America",
    password: "test1234",
    username: "synapse_nomfa",
  }, function(mfaDevice, err) {
    if(err) {
      console.log("Got an error in BankEndpoint#link.");
      console.log(err);
    } else {
      _.each(mfaDevice.data, function(mfaDevice) {
        console.log(mfaDevice);
      });
    }
  });

}).catch(function(e) {
  console.log("Got an error when attempting to log in.");
  console.log(e);
});
