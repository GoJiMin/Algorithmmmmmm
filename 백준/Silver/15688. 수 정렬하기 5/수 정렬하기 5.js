const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const [n, ...arr] = input.map(Number);

const table = Array(2000001).fill(0);
let result = "";

for (let i = 0; i < n; i++) {
  table[arr[i] + 1000000]++;
}

for (let i = 0; i < table.length; i++) {
  while (table[i]--) result += i - 1000000 + "\n";
}

console.log(result);
