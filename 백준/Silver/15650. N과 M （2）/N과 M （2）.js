const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split(" ");

const [n, m] = input;

const arr = [];
const isUsed = Array(30).fill(0);

let result = "";

function solution(k) {
  if (k === +m) {
    result += arr.join(" ") + "\n";

    return;
  }

  let start = 1;

  if (k !== 0) start = arr[k - 1] + 1;

  for (let i = start; i <= +n; i++) {
    if (!isUsed[i]) {
      arr[k] = i;
      isUsed[i] = 1;
      solution(k + 1);
      isUsed[i] = 0;
    }
  }
}

solution(0);

console.log(result);
