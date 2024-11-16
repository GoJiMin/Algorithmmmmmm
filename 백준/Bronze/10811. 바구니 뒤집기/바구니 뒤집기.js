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
  let [i, j] = input[idx].split(" ").map(Number);

  while (i <= j) {
    [arr[i - 1], arr[j - 1]] = [arr[j - 1], arr[i - 1]];

    i++;
    j--;
  }
}

console.log(arr.join(" "));
