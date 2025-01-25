const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim();

const [n, k] = input.split(" ").map(Number);

function solve(n, k) {
  const arr = Array(n + 1).fill(true);

  let cnt = 0;
  for (let i = 2; i <= n; i++) {
    if (arr[i]) {
      for (let j = i; j <= n; j += i) {
        if (arr[j]) cnt++;

        arr[j] = false;

        if (cnt === k) {
          return j;
        }
      }
    }
  }
}

console.log(solve(n, k));
