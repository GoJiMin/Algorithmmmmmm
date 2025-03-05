const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

/**
 * 오늘 너무 바빠서 날먹 문제 하나로 퉁칠게요.. 반성합시다..
 *
 * 스트릭 깨지는건 못참아!!!!
 */

const [n, k] = input[0].split(" ").map(Number);
const arr = input[1]
  .split(" ")
  .map(Number)
  .sort((a, b) => a - b);

console.log(arr[k - 1]);
