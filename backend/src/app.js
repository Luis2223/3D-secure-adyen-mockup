require('dotenv').config();
const express = require('express');

const routes = require('./routes');
class App {
    constructor() {
        this.server = express();
    }

    routes() {
        this.server.use(routes);
    }
}

module.exports = new App().server;