function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
} 

function divide(num1, num2) {
    if (num2 !== 0) {
        return num1 / num2;
    } else {
        throw new Error("Can not be divided by 0");
    }
}

module.exports = {
    add,
    subtract,
    multiply,
    divide,
};