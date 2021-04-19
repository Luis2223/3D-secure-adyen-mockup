const { Router } = require("express");
const PaymentController = require("./app/controllers/PaymentController");
const MethodsPaymentController = require('./app/controllers/methodsPaymentController');
const PaymentDetailsController = require('./app/controllers/paymentDetailsController')

const routes = new Router();

// get methods
routes.get('/methods/list', MethodsPaymentController.index);

// payments
routes.post('/payments/receveid', PaymentController.store);

// payments details
routes.post('/payments/details', PaymentDetailsController.store);

module.exports = routes;