const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const [nm, arr] = input;

const [n, m] = nm.split(" ");
const nums = arr.split(" ").sort((a, b) => a - b);

const list = [];
const isUsed = Array(10001).fill(0);

let result = "";

function solution(k) {
  if (k === +m) {
    result += list.join(" ") + "\n";

    return;
  }

  for (let i = 0; i < +n; i++) {
    if (!isUsed[Number(nums[i])]) {
      list[k] = Number(nums[i]);
      isUsed[Number(nums[i])] = 1;
      solution(k + 1);
      isUsed[Number(nums[i])] = 0;
    }
  }
}

solution(0);

console.log(result);
