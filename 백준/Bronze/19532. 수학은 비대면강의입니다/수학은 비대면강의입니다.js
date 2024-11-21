const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim();

const [a, b, c, d, e, f] = input.split(" ").map(Number);

/**
 * -999부터 999..
 * 2중 for 문 돌렸을 때 약 400만번..? 충분..??
 */

function solution(a, b, c, d, e, f) {
  for (let i = -999; i <= 999; i++) {
    for (let j = -999; j <= 999; j++) {
      if (a * i + b * j === c && d * i + e * j === f) return [i, j].join(" ");
    }
  }
}

const result = solution(a, b, c, d, e, f);

console.log(result);
