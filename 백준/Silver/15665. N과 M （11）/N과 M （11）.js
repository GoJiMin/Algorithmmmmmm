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

function solution(k) {
  if (k === +m) {
    return (result += arr.join(" ") + "\n");
  }

  let tmp = 0;

  for (let i = 0; i < +n; i++) {
    if (tmp !== nums[i]) {
      arr[k] = nums[i];
      tmp = nums[i];
      solution(k + 1);
    }
  }
}

solution(0);

console.log(result);
