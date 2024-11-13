const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim();

const [a, b] = input.split(" ").map(BigInt);

console.log((a * b).toString());
