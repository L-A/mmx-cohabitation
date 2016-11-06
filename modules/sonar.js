var five = require("johnny-five"), sensor;
var Bacon = require("baconjs");
var avg = require("./helpers").average;
var sonar = {};

var changeReceiver;

// Configs

var pollFreq = 100;

sonar.startBoard = function () {
  console.log("Setting up!");

  five.Board().on("ready", function() {
    var p1 = new five.Proximity({
      controller: "HCSR04",
      freq: pollFreq,
      pin: 8
    }),
    p2 = new five.Proximity({
      controller: "HCSR04",
      freq: pollFreq,
      pin: 7
    });

    p1.on("change", function() {
      onControllerChange(this.cm);
    });
    // p2.on("change", function() {
    //   console.log("2~cm  : ", this.cm);
    // });
  });
};

function onControllerChange(length) {
  if (length >= 24) { return; } // Reject *all* events above 35cm

  else {
    // Fingers crossed for a good rolling average
    distanceBus.push(length);
  }
}

var sendChange = function (length) {
  console.log(length);
  if (changeReceiver) { changeReceiver(length); }
}

sonar.registerReceiver = function (receiverCall) {
  changeReceiver = receiverCall;
}

var distanceBus = new Bacon.Bus();
distanceBus.slidingWindow(10).map(avg).onValue(function(value) { sendChange(value); });

module.exports = sonar;
