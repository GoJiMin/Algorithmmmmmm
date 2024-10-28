const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const [nm, arr, ...ij] = input;

const [n, m] = nm.split(" ").map(Number);
const nums = arr.split(" ").map(Number);

const sec = ij.map((el) => el.split(" ").map(Number));

const d = Array(1001).fill(0);

for (let k = 1; k <= n; k++) {
  d[k] = d[k - 1] + nums[k - 1];
}

const result = [];

for (let k = 0; k < m; k++) {
  const [i, j] = sec[k];

  result.push(d[j] - d[i - 1]);
}

console.log(result.join("\n"));
