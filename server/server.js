var express = require('express');
var http = require('http');
var path = require('path');
var env = require("./config/env")[process.env.NODE_ENV || 'development'];

/**
* @author : Daniel (devnieL) Flores
*
*/

global.version = "0.0.1";
global.rootDirectory = path.resolve(__dirname + "/../");


/**
 * Some global configs
 */

Object.defineProperty(Error.prototype, 'toJSON', {
    value: function () {
        var alt = {};

        Object.getOwnPropertyNames(this).forEach(function (key) {
            alt[key] = this[key];
        }, this);

        return alt;
    },
    configurable: true
});

// Set app
var app = express();

require("./config/express")(app);

// Start the app by listening on port
var port = process.env.PORT || 3000;

// Log events
console.log("Express app started on port: " + port);

// Start server
var server = http.createServer(app);
server.listen(port);

// Expose app for testing
exports = module.exports.app = server;
