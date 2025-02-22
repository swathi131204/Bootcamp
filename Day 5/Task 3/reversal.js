// Get the input string from command-line arguments
const inputString = process.argv[2];

if (!inputString) {
  console.log("Please provide a string to reverse.");
} else {
  // Reverse the string and print the result
  const reversedString = inputString.split('').reverse().join('');
  console.log(reversedString);
}
