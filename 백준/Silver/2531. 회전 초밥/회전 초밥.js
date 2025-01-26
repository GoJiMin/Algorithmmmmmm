const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const [n, d, k, c] = input[0].split(" ").map(Number);
const arr = [];

for (let i = 1; i <= n; i++) arr.push(Number(input[i]));
for (let i = 0; i < k - 1; i++) arr.push(arr[i]); // 원형 처리..

const countSushi = Array(d + 1).fill(0);
let cnt = 0; // 현재 고른 초밥.. 중복은 없게..

// 초기 윈도우..
for (let i = 0; i < k; i++) {
  const x = arr[i];

  if (countSushi[x] === 0) cnt++;
  countSushi[x]++;
}

let ans = cnt + (countSushi[c] === 0 ? 1 : 0); // 쿠폰에 적힌 초밥은 없어도 만들어줌..

let st = 0;
let en = k - 1;

while (st < n) {
  // 윈도우 밀기..
  const removeSushi = arr[st];
  countSushi[removeSushi]--;

  // 만약에 8 8 이렇게 골랐으면 고른 초밥을 감소시키면 안되죠?
  if (countSushi[removeSushi] === 0) cnt--;

  st++;
  en++;

  // 초밥 하나 먹기
  const addSushi = arr[en];
  if (countSushi[addSushi] === 0) cnt++;
  countSushi[addSushi]++;

  const tmp = cnt + (countSushi[c] === 0 ? 1 : 0); // 마찬가지로 쿠폰에 적힌 초밥은 없어도 만들어줌..

  ans = Math.max(ans, tmp);
}

console.log(ans);
