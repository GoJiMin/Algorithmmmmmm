const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const arr = input[1].split(" ").map(Number);

arr.sort((a, b) => a - b);

console.log(arr[0] * arr.at(-1));
