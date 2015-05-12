'use strict';

var _ = require('lodash');

var Client = require('./Client');
var Bank = require('./resources/Bank');
var BankMfaDevice = require('./resources/BankMfaDevice');
var BankMfaQuestions = require('./resources/BankMfaQuestions');
var BankStatus = require('./resources/BankStatus');
var Card = require('./resources/Card');
var Deposit = require('./resources/Deposit');
var MassPay = require('./resources/MassPay');
var Order = require('./resources/Order');
var User = require('./resources/User');
var Wire = require('./resources/Wire');
var Withdrawal = require('./resources/Withdrawal');

function SynapsePay(client_id, client_secret) {
  this.clientId = clientId;
  this.clientSecret = clientSecret;
}

SynapsePay = _.extend(SynapsePay, {
  apiBase: "https://synapsepay.com/api/v2/",
  apiStaging: "https://sandbox.synapsepay.com/api/v2",
  apiVersion: "v2",
  supportEmail: "hello@synapsepay.com",
  docsUrl: "http://synapsepay.readme.io/v1.0/docs",

  apiSandbox: "https://sandbox.synapsepay.com/api/v2",

  Client: Client,

  Bank: Bank,
  BankMfaDevice: BankMfaDevice,
  BankMfaQuestions: BankMfaQuestions,
  BankStatus: BankStatus,
  Card: Card,
  Deposit: Deposit,
  MassPay: MassPay,
  Order: Order,
  User: User,
  Wire: Wire,
  Withdrawal: Withdrawal,
});

module.exports = SynapsePay;
