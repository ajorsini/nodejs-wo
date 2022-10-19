const assert = require('chai').assert;
const packageFile = require('../package.json');
const calculator = require('../calculator');
const glob = require('glob');
const fs = require('fs');

// variable declairation
let sum = 0;
let sub = 0;
let mul = 0;
let div = 0;

// testsuit
describe('Calculator testing', function () {
  describe('Functionality testing', function () {
    describe('Addition functionality testing', function () {
      // testcase to test is dependencies are used or not
      it('Add two positive numbers, returning get positive sum', function () {
        assert.strictEqual(calculator('a', { lhs: 10, rhs: 5 }), 15);
      });
      // test case to test add functionality

      it('Add two negative numbers, returning get negative sum', function () {
        assert.strictEqual(calculator('a', { lhs: -10, rhs: -5 }), -15);
      });

      // test case to test add functionality
      it('Add two number, with either of them is negative, producing subtracted output'
        , function () {
          assert.strictEqual(calculator('a', { lhs: -10, rhs: 5 }), -5);
          assert.strictEqual(calculator('a', { lhs: 10, rhs: -5 }), 5);
        });
      // test case to test add functionality
      it('Add zeros, produces zero', function () {
        assert.strictEqual(calculator('a', { lhs: 15, rhs: 0 }), 15);
        assert.strictEqual(calculator('a', { lhs: 0, rhs: 15 }), 15);
        assert.strictEqual(calculator('a', { lhs: 0, rhs: 0 }), 0);
      });
    });
    describe('Subtraction functionality testing', function () {
      // test case to test subtract functionality
      it('Subtract two positive numbers, returning get positive subtraction',
        function () {
          assert.strictEqual(calculator('s', { lhs: 10, rhs: 5 }), 5);
        });

      // test case to test subtract functionality
      it('Subtract two negative numbers, returning get negative subtraction',
        function () {
          assert.strictEqual(calculator('s', { lhs: 5, rhs: 10 }), -5);
        });

      // test case to test subtract functionality
      it('Subtract two number, with either of them is negative, producing sum output'
        , function () {
          assert.strictEqual(calculator('s', { lhs: 5, rhs: -10 }), 15);
          assert.strictEqual(calculator('s', { lhs: -5, rhs: 10 }), -15);
        });

      // test case to test subtract functionality
      it('Subtract zeros, produces zero', function () {
        assert.strictEqual(calculator('s', { lhs: 5, rhs: 0 }), 5);
        assert.strictEqual(calculator('s', { lhs: 0, rhs: 5 }), -5);
        assert.strictEqual(calculator('s', { lhs: 0, rhs: 0 }), 0);
      });
    });
    describe('Multiplication functionality testing', function () {
      // test case to test multiply functionality
      it('Multiply two positive numbers, returning get positive Multiplication', function () {
        assert.strictEqual(calculator('m', { lhs: 5, rhs: 3 }), 15);
      });
      // test case to test multiply functionality
      it('Multiply two negative numbers, returning get positive Multiplication', function () {
        assert.strictEqual(calculator('m', { lhs: -5, rhs: -3 }), 15);
      });
      // test case to test multiply functionality
      it(`Multiply two number, with either of them is negative,
        producing negative multiplication output`,
        function () {
          assert.strictEqual(calculator('m', { lhs: -5, rhs: 3 }), -15);
          assert.strictEqual(calculator('m', { lhs: 5, rhs: -3 }), -15);
        });

      // test case to test multiply functionality
      it('Multiply zeros, produces zero', function () {
        assert.strictEqual(calculator('m', { lhs: 0, rhs: 3 }), 0);
        assert.strictEqual(calculator('m', { lhs: 5, rhs: 0 }), 0);
        assert.strictEqual(calculator('m', { lhs: 0, rhs: 0 }), 0);
      });
    });
    describe('Division functionality testing', function () {
      // test case to test divide functionality

      it('Divide two positive numbers, returning get positive Multiplication', function () {
        assert.strictEqual(calculator('d', { lhs: 15, rhs: 5 }), 3);
      });


      // test case to test divide functionality
      it('Divide two negative numbers, returning get positive Multiplication', function () {
        assert.strictEqual(calculator('d', { lhs: -15, rhs: -5 }), 3);
      });

      // test case to test divide functionality

      it('Divide two number, with either of them is negative, producing negative Division output',
        function () {
          assert.strictEqual(calculator('d', { lhs: -15, rhs: 5 }), -3);
          assert.strictEqual(calculator('d', { lhs: 15, rhs: -5 }), -3);
        });

      // test case to test divide functionality
      it(`Should not divide by 0, producing 'Can not divide by zero' message`, function () {
        assert.strictEqual(calculator('d', { lhs: 15, rhs: 0 }), 'Can not divide by zero');
      });
    });
    describe('Unknown operation testing', function () {
      // test case to test divide functionality
      it(`should not calculate if unknown operation is passed,
        producing 'Unknown operation' message`,
        function () {
          assert.strictEqual(calculator('k', { lhs: 15, rhs: 0 }), 'Unknown operation');
        });
    });
  });
});
