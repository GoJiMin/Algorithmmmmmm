const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const [nm, numbers] = input;

const [n, m] = nm.split(" ");
const nums = numbers.split(" ").sort((a, b) => a - b);

const arr = [];

let result = "";

function solution(k, idx) {
  if (k === +m) {
    return (result += arr.join(" ") + "\n");
  }

  for (let i = idx; i < +n; i++) {
    arr[k] = nums[i];
    solution(k + 1, i);
  }
}

solution(0, 0);

console.log(result);
