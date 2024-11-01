const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const [n, ...arr] = input;

const flowers = arr.map((el) => el.trim().split(" ").map(Number));

flowers.sort((a, b) => a[0] - b[0] || a[1] - b[1]);

/**
 * 3월 ~ 11월
 - 1 1 5 31 (1월 1일 ~ 5월 31일) 
 - 1 1 6 30 (1월 1일 ~ 6월 30일)
 - 5 15 8 31 (5월 15일 ~ 8월 31일)
 - 6 10 12 10 (6월 10일 ~ 12월 10일)
 */

let t = 301;
let ans = 0;
let idx = 0;
let maxEnd = 0;

while (t < 1201) {
  let isBloomed = false;

  while (idx < n) {
    const [startM, startD, endM, endD] = flowers[idx];
    const startDate = startM * 100 + startD;
    const endDate = endM * 100 + endD;

    if (startDate > t) break;
    if (endDate > maxEnd) {
      maxEnd = endDate;
      isBloomed = true;
    }

    idx++;
  }

  if (!isBloomed) {
    console.log(0);
    return;
  }

  ans++;
  t = maxEnd;
}

console.log(ans);
