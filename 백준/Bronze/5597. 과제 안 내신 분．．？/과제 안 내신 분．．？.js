const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const arr = Array(31).fill(0);

for (let i = 0; i < 28; i++) {
  arr[Number(input[i])]++;
}

const result = [];

for (let i = 1; i <= 30; i++) {
  if (!arr[i]) result.push(i);
}

console.log(result.join("\n"));
