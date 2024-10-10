const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const [n, m] = input[0].split(" ").map(Number);

const arrA = input[1].split(" ").map(Number);
const arrB = input[2].split(" ").map(Number);

let idxA = 0;
let idxB = 0;

const result = [];

for (let i = 0; i < n + m; i++) {
  if (idxA === n) {
    result[i] = arrB[idxB++];
  } else if (idxB === m) {
    result[i] = arrA[idxA++];
  } else if (arrA[idxA] > arrB[idxB]) {
    result[i] = arrB[idxB++];
  } else {
    result[i] = arrA[idxA++];
  }
}

console.log(result.join(" "));
