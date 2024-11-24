const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim();

/**
 * 입력은 n, t, c, p
 * n - 여름의 총 일수.
 * t - 스타후르츠가 자라는 데 걸리는 시간.
 * c - 스타후르츠를 심을 수 있는 칸의 수.
 * p - 스타후르츠의 가격.
 */

const [n, t, c, p] = input.split(" ").map(Number);

const plantable = n % t === 0 ? Math.floor(n / t) - 1 : Math.floor(n / t);

const maxFruitsPrice = plantable * c * p;

console.log(maxFruitsPrice);
