const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

/**
 * 흠.. 백트래킹 문제네요..
 *
 * 부등호를 만족하는 모든 경우를 탐색해야될 거 같은데요.
 * 0, 1, 2... 이렇게 시작해서 k가 n + 1이 됐을 때 부등호를 모두 돌려 가능한 경우에 max와 min을 업데이트해봅시다..
 */

const n = Number(input[0]);
const signs = input[1].trim().split(" ");

const isUsed = Array(9).fill(false);

const cur = [];

let max = 0;
let min = 9999999999;

function bt(k) {
  if (k === n + 1) {
    let isPossible = true;

    for (let i = 0; i < k - 1; i++) {
      const left = cur[i];
      const right = cur[i + 1];

      const sign = signs[i];

      if (sign === "<" && left > right) isPossible = false;
      if (sign === ">" && left < right) isPossible = false;
    }

    if (!isPossible) return;

    const curNum = cur.join("");

    if (parseInt(curNum) > parseInt(max)) max = curNum;
    if (parseInt(curNum) < parseInt(min)) min = curNum;

    return;
  }

  for (let i = 0; i <= 9; i++) {
    if (!isUsed[i]) {
      isUsed[i] = true;
      cur[k] = i;
      bt(k + 1);
      isUsed[i] = false;
    }
  }
}

bt(0);

console.log(max + "\n" + min);
