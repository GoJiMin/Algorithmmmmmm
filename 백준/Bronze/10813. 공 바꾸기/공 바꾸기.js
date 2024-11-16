const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const [n, m] = input[0].split(" ").map(Number);

const arr = Array(n)
  .fill(0)
  .map((_, i) => i + 1);

for (let idx = 1; idx <= m; idx++) {
  const [i, j] = input[idx].trim().split(" ").map(Number);

  [arr[i - 1], arr[j - 1]] = [arr[j - 1], arr[i - 1]];
}

console.log(arr.join(" "));
