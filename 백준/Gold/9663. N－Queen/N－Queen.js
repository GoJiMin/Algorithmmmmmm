const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim();

const n = Number(input);

const isUsed1 = Array(40).fill(0);
const isUsed2 = Array(40).fill(0);
const isUsed3 = Array(40).fill(0);

let cnt = 0;

function solution(cur) {
  if (cur === n) {
    cnt++;
    return;
  }

  for (let i = 0; i < n; i++) {
    if (isUsed1[i] || isUsed2[cur + i] || isUsed3[cur - i + n - 1]) continue;

    isUsed1[i] = 1;
    isUsed2[cur + i] = 1;
    isUsed3[cur - i + n - 1] = 1;

    solution(cur + 1);

    isUsed1[i] = 0;
    isUsed2[cur + i] = 0;
    isUsed3[cur - i + n - 1] = 0;
  }
}

solution(0);

console.log(cnt);
