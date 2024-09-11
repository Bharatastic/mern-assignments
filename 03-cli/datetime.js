const readline = require("node:readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.question(`Type date or time to get the current date or time: `, datetime => {
    const now = new Date();
    const date = now.getDate();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();
    const hour = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    if (datetime === "date") {
        const fullDate = `${date}-${month}-${year}`;
        console.log(fullDate);
    } else if (datetime === "time") {
        const fullTime = `${hour}:${minutes}:${seconds}`;
        console.log(fullTime);
    } else {
        console.log("Wrong input!");
    }
    rl.close();
})