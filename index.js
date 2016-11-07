var path = require('path');
global.appRoot = path.resolve(__dirname);

// ✓ In Sonar: A "Register measurement receiver" method
// ✓ In Trigger: A "Match measurement with state" method
// ✓ In Server: A public "Set state" update sent to the client

var server = require ("./modules/server");
var helpers = require ("./modules/helpers");
var stateController = require ("./modules/triggers");

var currentState = -1; // -1 is just "Don't show anything"

// var sonar = require ("./modules/sonar");
// sonar.startBoard();
// sonar.registerReceiver(stateController.receiveMeasurement);

stateController.registerStateSender(server.askForState);
