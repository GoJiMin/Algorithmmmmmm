const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const n = Number(input[0]);
const arr = input[1].split(" ").map(Number);

for (let i = 1; i < n; i++) arr[i] = arr[i] + arr[i - 1];

const m = Number(input[2]);
const result = [];

for (let i = 3; i < 3 + m; i++) {
  const [st, en] = input[i].split(" ").map(Number);

  result.push(arr[en - 1] - (arr[st - 2] || 0));
}

console.log(result.join("\n"));
