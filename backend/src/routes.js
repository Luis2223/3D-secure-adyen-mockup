const { Router } = require("express");
const PaymentController = require("./app/controllers/PaymentController");
const MethodsPaymentController = require('./app/controllers/methodsPaymentController');

const routes = new Router();

// get methods
routes.get('/methods/list', MethodsPaymentController.index);

// payments
routes.post('/payments/receveid', PaymentController.store)

module.exports = routes;