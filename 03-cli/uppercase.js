const readline = require("node:readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.question("Enter a string: ", string => {
    const upString = string.toUpperCase();
    console.log(`Original String: ${string}`);
    console.log(`Uppercase String: ${upString}`);
    rl.close();
})