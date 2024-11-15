const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const n = Number(input[0]);
const arr = input[1].split(" ").map(Number);

let cnt = 0;

for (let i = 0; i < n; i++) {
  if (arr[i] === 1) continue;
  let isDecimal = true;

  // 합성수 N에서 1을 제외한 가장 작은 약수는 √N 이하이다..
  // 그럼 제곱근까지만 for문 돌리기..
  for (let num = 2; num * num <= arr[i]; num++) {
    if (arr[i] % num === 0) {
      isDecimal = false;
      break;
    }
  }

  if (isDecimal) cnt++;
}

console.log(cnt);
