const chai = require('chai');
const expect = chai.expect;
const { addition, subtraction } = require('../src/calculatorApp');

describe('Addition Functionality', () => {

  it('Check for addition of two positive numbers and return the sum as positive number', () => {
    expect(addition(5, 10)).to.be.equal(15);
  });

  it('Check for addition of two negative numbers and return the sum as negative number.', () => {
    expect(addition(-5, -8)).to.be.equal(-13);
  });

  it('Check if either of number is negative produce subtracted output.', () => {
    expect(addition(-5, 10)).to.be.equal(5);
    expect(addition(5, -10)).to.be.equal(-5);
  });


});

describe('Subtraction Functionality', () => {
  it('Check for subtracting two positive number and return positive subtraction', () => {
    expect(subtraction(15, 10)).to.be.equal(5);
  });
  it('Check if either of number is negative produce sum as output', () => {
    expect(subtraction(-15, 10)).to.be.equal(-25);
    expect(subtraction(15, -10)).to.be.equal(25);
  });
  it('Subtracting zero will produce zero as subtraction.', () => {
    expect(subtraction(15, 0)).to.be.equal(15);
    expect(subtraction(0, 0)).to.be.equal(0);
  });
});
