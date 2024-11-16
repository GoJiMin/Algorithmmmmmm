const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const A = Number(input[0]);
const B = input[1];

console.log(A * parseInt(B[2]));
console.log(A * parseInt(B[1]));
console.log(A * parseInt(B[0]));
console.log(A * parseInt(B));
