var randomCoordinates = require("random-coordinates");

x = randomCoordinates();
y = x.split(",");
console.log({ lat: y[0], long: y[1] });
