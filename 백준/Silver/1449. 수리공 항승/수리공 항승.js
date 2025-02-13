const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const [n, l] = input[0].split(" ").map(Number);
const arr = input[1].split(" ").map(Number);

arr.sort((a, b) => a - b);

let tapes = 0;
let coveredEnd = 0;

for (let i = 0; i < n; i++) {
  if (arr[i] <= coveredEnd) continue;

  tapes++;

  coveredEnd = arr[i] + l - 1;
}

console.log(tapes);
