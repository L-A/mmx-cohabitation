var five = require("johnny-five"), sensor;
var sonar = {};

var distanceA, distanceB;
var changeReceiver;

// Configs

var pollFreq = 60;
var distanceThreshold = 0.15;

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
  if (length >= 18) { return; } // Reject *all* events above 18cm

  if (!distanceA) {distanceA = length} // Initial reading

  else if (Math.abs(length - distanceA) >= distanceThreshold) {

    // If the change is enough to register:
    if (changeReceiver) {changeReceiver(length)};
    distanceA = length;
  }
}

sonar.registerReceiver = function (receiverCall) {
  changeReceiver = receiverCall;
}

module.exports = sonar;
