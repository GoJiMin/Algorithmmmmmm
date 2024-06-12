const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const [A, B, C] = input.map(Number);

console.log(A + B - C);
console.log(`${A}${B}` - C);
