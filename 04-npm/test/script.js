const { add, subtract, multiply, divide } = require("basic-math-npm-package");

const addOperation = add(5, 4);
console.log(addOperation);

const subtractOperation = subtract(6, 3);
console.log(subtractOperation);

const multiplyOperation = multiply(4, 5);
console.log(multiplyOperation);

const divideOperation = divide(12, 3);
console.log(divideOperation);

const divideErroreOperation = divide(12, 0);
// console.log(divideErroreOperation); // Will give error