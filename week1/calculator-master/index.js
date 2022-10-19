const chalk = require("chalk");

const mathCalculator = require("./src/mathCalculator");
const scientificCalculator = require("./src/scientificCalculator");

// Read choice from console and execute `npm start math` or `npm start scientific`
const choice = process.argv[2];

const mathNum1 = 20;
const mathNum2 = 4;
const scfNum = 9.5;

debugger;

if (choice === "math") {
 // Display all math operations
  mathCalculator.addNumbers(5, 10);
  mathCalculator.subNumbers(10, 5);
  mathCalculator.mulNumbers(5, -10);
  mathCalculator.divNumbers(0, 5);
  mathCalculator.divNumbers(10, 0);
  mathCalculator.moduloNumbers(0, 10);
  mathCalculator.moduloNumbers(10, 0);
} else if (choice === "scientific") {
  // Display all scientific operations
  scientificCalculator.computeCeil(9.5);
  scientificCalculator.computeCeil(-10);
  scientificCalculator.computeFloor(9.006);
  scientificCalculator.computeFloor(-10);
  scientificCalculator.computeSquareRoot(15.8);
  scientificCalculator.computeSquareRoot(0);
  scientificCalculator.computePower(3, 3);
  scientificCalculator.computePower(3, 3);
  scientificCalculator.computePower(3, 0);
} else {
  console.log("Please enter valid choice..!");
}
