const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

/**
 * 사실 생각해보면 어떤 과일인지까지는 알 필요가 없습니다.
 *
 * 그냥 포인터 2개를 옮기면서 과일의 개수만 체크하면 될 거 같아요.
 */

const n = Number(input[0]);
const fruits = input[1].split(" ").map(Number);

let left = 0;
let ans = 0;

let freq = new Map(); // 과일 종류 담아놓기

for (let right = 0; right < n; right++) {
  const curFruit = fruits[right];

  freq.set(curFruit, (freq.get(curFruit) || 0) + 1);

  // 만약 과일 종류가 3개 이상이라면
  while (freq.size > 2) {
    const leftFruit = fruits[left];

    freq.set(leftFruit, freq.get(leftFruit) - 1);
    // 과일 하나 빼보고 다 빼버렸으면 지우기
    if (freq.get(leftFruit) === 0) freq.delete(leftFruit);

    left++;
  }

  ans = Math.max(ans, right - left + 1);
}

console.log(ans);
