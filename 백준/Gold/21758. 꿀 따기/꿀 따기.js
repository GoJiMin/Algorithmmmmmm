const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

/**
 * 벌통 문제가 패턴이 3가지나 나오더라구요.. 원래 처음에는 벌통을 제일 오른쪽 끝에 두고,
 * 벌 하나는 왼쪽 끝, 그리고 나머지 벌 하나를 옮기면서 찾아봤는데 2 5 4 반례 얻어맞고 다시 풉니다.
 *
 * 패턴 1: 벌통이 오른쪽 끝에 있고, 벌1은 왼쪽 끝, 벌2는 어딘가..
 * 패턴 2: 벌통이 왼쪽 끝에 있고, 벌1은 오른쪽 끝, 벌2는 어딘가..
 * 패턴 3: 벌1은 왼쪽 끝에 있고, 벌2는 오른쪽 끝, 벌통이 어딘가..
 */

const n = Number(input[0]);
const arr = input[1].split(" ").map(Number);

const prefix = [arr[0]];

for (let i = 1; i < n; i++) prefix[i] = prefix[i - 1] + arr[i];

// 패턴 1: 벌통이 오른쪽 끝에 있고, 벌1은 왼쪽 끝, 벌2는 어딘가..
const pattern1_init = prefix[n - 1] - prefix[0];
let pattern1_best = 0;

for (let i = 1; i < n; i++) {
  let tmp = pattern1_init - arr[i];

  tmp += prefix[n - 1] - prefix[i];

  pattern1_best = Math.max(pattern1_best, tmp);
}

// 패턴 2: 벌통이 왼쪽 끝에 있고, 벌1은 오른쪽 끝, 벌2는 어딘가..
const pattern2_init = prefix[n - 2]; // 벌통이 왼쪽 끝에 있으면, 오른쪽 끝에 벌이 꿀을 못 땀..
let pattern2_best = 0;

for (let i = n - 2; i >= 0; i--) {
  let tmp = pattern2_init - arr[i];

  tmp += prefix[i] - arr[i];

  pattern2_best = Math.max(pattern2_best, tmp);
}

// 패턴 3: 벌1은 왼쪽 끝에 있고, 벌2는 오른쪽 끝, 벌통이 어딘가..
let pattern3_best = 0;

for (let i = 1; i < n - 1; i++) {
  let tmp = 0;

  tmp += prefix[i] - prefix[0];
  tmp += prefix[n - 1] - prefix[i - 1] - arr[n - 1];

  pattern3_best = Math.max(tmp, pattern3_best);
}

console.log(Math.max(pattern1_best, pattern2_best, pattern3_best));
