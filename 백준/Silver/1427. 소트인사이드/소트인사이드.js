const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim();

const arr = [...input.split("").map(Number)];

console.log(arr.sort((a, b) => b - a).join(""));
