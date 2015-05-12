'use strict';

var SynapsePay = require('../../lib/SynapsePay');
var _ = require('lodash');

// Make sure we are running in sandbox
SynapsePay.apiBase = SynapsePay.apiSandbox;
SynapsePay.clientId = "4528d2e0a2988064d8ac";
SynapsePay.clientSecret = "dcbf52b16040c94a35f345b7e2c285f936d673c9";
SynapsePay.User.login("3ac38d63db58466982fe6f871c48f1", "TestTest123$").then(function(client) {

  // With a promise
  client.massPays.create({
    mass_pays: [
      {
        "legal_name": "Some Person 1",
        "account_number": "888888888",
        "routing_number": "222222222",
        "amount": "10.33",
        "trans_type": "0",
        "account_class": "1",
        "account_type": "2",
        "user_info": {
          "email": "some@email.com",
          "phone_number": "9011234567",
          "ip_address": "some.ip.address",
          "dob": "18/11/1989",
          "risk_score": 10
        }
      },
      {
        "legal_name": "Some Person 2",
        "account_number": "888888888",
        "routing_number": "222222222",
        "amount": "10.33",
        "trans_type": "0",
        "account_class": "1",
        "account_type": "1"
      }
    ]
  }).then(function(massPays) {
    _.each(massPays.data, function(massPay) {
      console.log(massPay);
    });
  }).catch(function(err) {
    console.log("Got an error in MassPayEndpoint#create.");
    console.log(err);
  });

  // With a callback
  client.massPays.create({
    mass_pays: [
      {
        "legal_name": "Some Person 1",
        "account_number": "888888888",
        "routing_number": "222222222",
        "amount": "10.33",
        "trans_type": "0",
        "account_class": "1",
        "account_type": "2",
        "user_info": {
          "email": "some@email.com",
          "phone_number": "9011234567",
          "ip_address": "some.ip.address",
          "dob": "18/11/1989",
          "risk_score": 10
        }
      },
      {
        "legal_name": "Some Person 2",
        "account_number": "888888888",
        "routing_number": "222222222",
        "amount": "10.33",
        "trans_type": "0",
        "account_class": "1",
        "account_type": "1"
      }
    ]
  }, function(massPays, err) {
    if(err) {
      console.log("Got an error in MassPayEndpoint#create.");
      console.log(err);
    } else {
      _.each(massPays.data, function(massPay) {
        console.log(massPay);
      });
    }
  });


  // With cards instead of bank info
  client.massPays.create({
    mass_pays: [
      {
        "amount": "20",
        "trans_type": "0",
        "card_id": "77"
      },
      {
        "amount": "20",
        "trans_type": "0",
        "card_id": "76"
      }
    ]
  }).then(function(massPays) {
    _.each(massPays.data, function(massPay) {
      console.log(massPay);
    });
  }).catch(function(err) {
    console.log("Got an error in MassPayEndpoint#create.");
    console.log(err);
  });

}).catch(function(e) {
  console.log("Got an error when attempting to log in.");
  console.log(e);
});
