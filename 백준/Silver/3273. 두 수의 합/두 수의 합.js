const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "script.txt")
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.split(" ").map(Number));

const [[n], arr, [x]] = input;

const cnt = Array(x).fill(0);
let answer = 0;

for (let i = 0; i < n; i++) {
  if (cnt[x - arr[i]]) {
    answer++;
  }

  cnt[arr[i]]++;
}

console.log(answer);
