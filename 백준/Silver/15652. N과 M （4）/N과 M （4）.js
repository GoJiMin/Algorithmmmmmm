const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split(" ");

const [n, m] = input;

const arr = [];

let result = "";

function solution(k) {
  if (k === +m) {
    result += arr.join(" ") + "\n";

    return;
  }

  let start = 1;

  if (k !== 0) start = arr[k - 1];

  for (let i = start; i <= +n; i++) {
    arr[k] = i;
    solution(k + 1);
  }
}

solution(0);

console.log(result);
