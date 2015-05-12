'use strict';

var _ = require('lodash');
var APIClient = require('./apibits/APIClient');
var BankEndpoint = require('./endpoints/BankEndpoint');
var BankMfaDeviceEndpoint = require('./endpoints/BankMfaDeviceEndpoint');
var BankMfaQuestionsEndpoint = require('./endpoints/BankMfaQuestionsEndpoint');
var BankStatusEndpoint = require('./endpoints/BankStatusEndpoint');
var CardEndpoint = require('./endpoints/CardEndpoint');
var DepositEndpoint = require('./endpoints/DepositEndpoint');
var MassPayEndpoint = require('./endpoints/MassPayEndpoint');
var OrderEndpoint = require('./endpoints/OrderEndpoint');
var UserEndpoint = require('./endpoints/UserEndpoint');
var WireEndpoint = require('./endpoints/WireEndpoint');
var WithdrawalEndpoint = require('./endpoints/WithdrawalEndpoint');


function Client(oauthConsumerKey, refreshToken) {
  if(!(this instanceof Client)) {
    return new Client(oauthConsumerKey, refreshToken);
  }

  this.banks = BankEndpoint(this);
  this.bankMfaDevices = BankMfaDeviceEndpoint(this);
  this.bankMfaQuestions = BankMfaQuestionsEndpoint(this);
  this.bankStatuses = BankStatusEndpoint(this);
  this.cards = CardEndpoint(this);
  this.deposits = DepositEndpoint(this);
  this.massPays = MassPayEndpoint(this);
  this.orders = OrderEndpoint(this);
  this.users = UserEndpoint(this);
  this.wires = WireEndpoint(this);
  this.withdrawals = WithdrawalEndpoint(this);

  this.refresh_from({
    oauth_consumer_key: oauthConsumerKey,
    refresh_token: refreshToken,
  });
}

Client = _.extend(Client, {
});

Client.prototype = _.extend(Client.prototype, APIClient.prototype, {
  refresh_from: function(json) {
    _.extend(this, json);
    _.extend(this,new APIClient({}, {
      oauth_consumer_key: json.oauth_consumer_key,
    }));
    return this;
  },
});

module.exports = Client;
