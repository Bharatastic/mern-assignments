const readline = require("node:readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.question("Enter a number: ", number => {
    let ans = 1;
    if (number == 0 || number == 1) {
        console.log(`Factorial of ${number}: ${ans}`);
    }
    else {
        for (let i = 2; i <= number; i++) {
            ans = ans * i;
        }
        console.log(`Factorial of ${number}: ${ans}`);
    }
    rl.close();
})