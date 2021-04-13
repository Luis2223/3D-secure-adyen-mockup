const { Router } = require("express");
const PaymentController = require("./app/controllers/PaymentController");

const routes = new Router();

routes.get('/', PaymentController.index);

module.exports = routes;