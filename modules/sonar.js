var five = require("johnny-five"), sensor;

var sonar = {};

sonar.startBoard = function () {
  five.Board().on("ready", function() {
    var p1 = new five.Proximity({
      controller: "HCSR04",
      freq: 100,
      pin: 8
    }),
    p2 = new five.Proximity({
      controller: "HCSR04",
      freq: 250,
      pin: 7
    });

    p1.on("data", function() {
      console.log("1~cm  : ", this.cm);
    });
    p2.on("data", function() {
      console.log("2~cm  : ", this.cm);
    });
  });
};

sonar.test = function () {
  console.log("Oh hi!");
}

module.exports = sonar;
