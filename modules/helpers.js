exports.cycle = function (delta, position, length) {
  return ((delta % length) + length + position) % length;
}

exports.closestValue = function (value, valueArray, property) {
  var chosenIndex = 0;
  var currentDistance = Math.abs(valueArray[0][property] - value);

  for(i = 0; i < valueArray.length; i++) {
    var evaluatedDistance = Math.abs(valueArray[i][property] - value);
    if (evaluatedDistance < currentDistance) {
      chosenIndex = i;
      currentDistance = evaluatedDistance;
    }
  }
  return chosenIndex;
}
