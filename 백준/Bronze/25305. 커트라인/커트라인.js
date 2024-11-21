const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const [_, m] = input[0].split(" ").map(Number);

const scores = input[1].split(" ").map(Number);

scores.sort((a, b) => b - a);

console.log(scores[m - 1]);
