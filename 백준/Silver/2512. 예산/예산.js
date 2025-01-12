const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const n = Number(input[0]);
const arr = input[1].split(" ").map(Number);
const max = Number(input[2]);

arr.sort((a, b) => a - b);

let st = 1;
let en = arr[n - 1];

let ans = 0;

while (st <= en) {
  const mid = Math.floor((st + en) / 2);

  let budget = 0;
  for (let i = 0; i < n; i++) {
    if (arr[i] >= mid) {
      // 상한액을 초과하는 예산일 경우 상한액 더하기.
      budget += mid;
    } else {
      budget += arr[i];
    }
  }

  if (budget <= max) {
    st = mid + 1;
    ans = mid;
  } else {
    en = mid - 1;
  }
}

console.log(ans);
