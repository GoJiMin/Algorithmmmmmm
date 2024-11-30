const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const n = Number(input[0]);
const nums = [];
const freq = new Map();

let sum = 0;

for (let i = 1; i <= n; i++) {
  const cur = Number(input[i]);

  sum += cur;
  nums.push(cur);

  freq.set(cur, (freq.get(cur) || 0) + 1);
}

nums.sort((a, b) => a - b);

const ans = [];

// 1. 산술 평균.
ans.push(Math.round(sum / n));

// 2. 중앙 값.
ans.push(nums[Math.floor(n / 2)]);

// 3. 최빈값.
// [정수, 빈도]
const freqArr = Array.from(freq.entries());

freqArr.sort((a, b) => b[1] - a[1] || a[0] - b[0]);

if (freqArr.length > 1 && freqArr[0][1] === freqArr[1][1]) {
  ans.push(freqArr[1][0]);
} else {
  ans.push(freqArr[0][0]);
}

// 4. 범위.
ans.push(nums.at(-1) - nums[0]);

console.log(ans.join("\n"));
