
//import the lodash module
const _ = require('lodash');

//Create a function to find a maximum value from number array.
function findMaxValue(a) {
  return _.max(a);
}


//Create a function to return all values from numbers array
//which are greater than the second parameter.​
function filterValues(a, fv) {
  return _.filter(a, (n) => _.gt(n, fv));
}

//Create a function to return all values of employeeName array in capital letters.

function nameInCapital(eName) {
  return eName.map((n) => _.capitalize(n));
}


module.exports = {
  findMaxValue,
  filterValues,
  nameInCapital,
}
