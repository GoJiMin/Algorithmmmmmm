const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const r = new Set(input[1].trim().split(" "));

input[2]
  .trim()
  .split(" ")
  .forEach((m) => r.delete(m));

console.log(...r);
