var closestValue = require("./helpers").closestValue;
var stateFor = require("./states-list").stateFor;
var chalk = require('chalk');

var currentMeasurement, currentMatchedState = 0, latestMatchedState;
var sendState;

var stateToConfirm = -1;

var interruptStateChange = false;

exports.registerStateSender = function(senderCallback) {
  stateSender = senderCallback;
}

exports.receiveMeasurement = function(measurement) {
  currentMeasurement = measurement;
  latestMatchedState = stateFor(measurement);

  //console.log("Distance mesurée: " + measurement + "cm");

  if(currentMatchedState.stateValue != latestMatchedState.stateValue) {
    stateToConfirm = latestMatchedState;
    setTimeout(function() {
      if(latestMatchedState == stateToConfirm) {
        switchToState(stateToConfirm);
        stateToConfirm = -1;
      }
    }, 600)
  }
}

var switchToState = function (newState) {
  if (!interruptStateChange) {
    interruptStateChange = true;

    console.log("--------------------------------------------------------------------- \n" + "Changement d'état vers " + chalk.green(newState.name));

    currentMatchedState = newState;
    sendState(currentMatchedState.stateValue);

    setTimeout( function() {interruptStateChange = false}, 1500);
  }
}

var sendState = function (state) {
  if(stateSender) {
    stateSender(state);
  }
}
