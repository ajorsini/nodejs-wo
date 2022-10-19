const chalk = require("chalk");

const { addition, subtraction, multiplication, division } = require("./src/calculatorApp");

console.log(addition(5, 10));
console.log(subtraction(10, 5));
console.log(multiplication(5, -10));
console.log(division(0, 5));
try {
  console.log(division(10, 0));
} catch(err) {
  console.log(err.message);
}
