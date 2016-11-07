/*
**    This should be a nicely structured JSON file
**    and some clean code, but y'know
**
**    It's in charge of associating weights (input) and the
**    appropriate states.
**
**    Current format: Array of objects with a measurable property (number)
**    They'll be evaluated by absolute proximity to the value.
*/

var closestValue = require("./helpers").closestValue;

var measurableProperty = "weight";

var valueAssociations = [
  {
    name: "Neutre",
    stateValue: "-1",
    weight: 3.5
  },
  {
    name: "Crucifix",
    stateValue: "0",
    weight: 4.2
  },
  {
    name: "Mortier",
    stateValue: "2",
    weight: 5
  },
  {
    name: "Exfoliant",
    stateValue: "1",
    weight: 6
  }
]

exports.stateFor = function (measurement) {
  var matchedStateIndex = closestValue(measurement, valueAssociations, measurableProperty);
  return valueAssociations[matchedStateIndex];
}
