const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const n = Number(input[0]);

const arrA = input[1].split(" ").map(Number);
const arrB = input[2].split(" ").map(Number);

arrA.sort((a, b) => a - b);
arrB.sort((a, b) => b - a);

let ans = 0;

for (let i = 0; i < n; i++) {
  ans += arrA[i] * arrB[i];
}

console.log(ans);
