const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "script.txt")
  .toString()
  .trim()
  .split("\n")
  .map(Number);

const result = new Set(input.map((v) => v % 42));

console.log(result.size);
