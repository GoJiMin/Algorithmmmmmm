const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const [_, ...arr] = input.map(Number);

arr.sort((a, b) => a - b);

console.log(arr.join("\n"));
