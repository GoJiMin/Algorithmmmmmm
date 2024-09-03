const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const arr = [];

for (let i = 0; i < input.length - 1; i++) {
  const numbers = input[i].split(" ");

  const n = Number(numbers.shift());
  const nums = numbers.sort((a, b) => a - b);
  let result = "";

  function solution(k, idx) {
    if (k === 6) {
      return (result += arr.join(" ") + "\n");
    }

    for (let j = idx; j < n; j++) {
      arr[k] = nums[j];
      solution(k + 1, j + 1);
    }
  }

  solution(0, 0);
  console.log(result);
}
