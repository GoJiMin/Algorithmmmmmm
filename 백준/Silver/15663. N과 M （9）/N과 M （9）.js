const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const [nm, numbers] = input;

const [n, m] = nm.split(" ");
const nums = numbers.split(" ").sort((a, b) => a - b);

const arr = [];
const isUsed = Array(10).fill(0);

let result = "";

function solution(k) {
  if (k === +m) {
    return (result += arr.join(" ") + "\n");
  }

  let tmp = "";

  for (let i = 0; i < +n; i++) {
    if (!isUsed[i] && tmp !== nums[i]) {
      arr[k] = nums[i];
      isUsed[i] = 1;
      tmp = nums[i];
      solution(k + 1);
      isUsed[i] = 0;
    }
  }
}

solution(0);

console.log(result);
