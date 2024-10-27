const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const [t, ...arr] = input.map(Number);
const result = [];

const d = Array(11).fill(0);

d[1] = 1;
d[2] = 2;
d[3] = 4;

for (let i = 4; i < 11; i++) {
  d[i] = d[i - 3] + d[i - 2] + d[i - 1];
}

for (let i = 0; i < t; i++) {
  result.push(d[arr[i]]);
}

console.log(result.join("\n"));
