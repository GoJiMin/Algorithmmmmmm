const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "script.txt")
  .toString()
  .trim()
  .split("\n")
  .map(Number);

const [n, ...arr] = input;

console.log(arr.sort((a, b) => a - b).join('\n'));