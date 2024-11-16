const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const [n, m] = input[0].split(" ").map(Number);

const arr = Array(n).fill(0);

for (let idx = 1; idx <= m; idx++) {
  let [i, j, k] = input[idx].trim().split(" ").map(Number);

  while (i <= j) {
    arr[i - 1] = k;
    i++;
  }
}

console.log(arr.join(" "));
