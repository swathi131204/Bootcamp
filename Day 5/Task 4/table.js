const args = process.argv.slice(2);

if (args.length === 0) {
    console.log("Please provide a number as a command-line argument.");
    process.exit(1);
}

const number = parseInt(args[0], 10);

if (isNaN(number)) {
    console.log("Invalid input. Please enter a valid number.");
    process.exit(1);
}

console.log(`Multiplication Table of ${number}:`);
for (let i = 1; i <= 10; i++) {
    console.log(`${number} x ${i} = ${number * i}`);
}
