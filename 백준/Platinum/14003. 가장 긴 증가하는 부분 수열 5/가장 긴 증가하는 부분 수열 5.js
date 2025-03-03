const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const n = Number(input[0]);
const arr = input[1].split(" ").map(Number);

// tmp => 해당 길이의 증가하는 부분 수열의 마지막 원소 값
// idx => tmp에 대응하는 원소의 인덱스
const tmp = [];
const idx = [];

// prev[i]는 arr[i]가 포함된 증가하는 부분 수열에서 바로 이전 원소의 인덱스
const prev = new Array(n).fill(-1);

for (let i = 0; i < n; i++) {
  const x = arr[i];

  // 이분 탐색으로 tmp에서 x가 들어갈 위치를 찾음
  let st = 0;
  let en = tmp.length - 1;
  let pos = tmp.length; // 만약 x가 tmp의 마지막보다 크다면 pos는 tmp.length

  while (st <= en) {
    const mid = Math.floor((st + en) / 2);
    if (tmp[mid] < x) {
      st = mid + 1;
    } else {
      pos = mid;
      en = mid - 1;
    }
  }

  // pos 위치에 x 넣기
  if (pos === tmp.length) {
    tmp.push(x);
    idx.push(i);
  } else {
    tmp[pos] = x;
    idx[pos] = i;
  }

  // pos가 0이 아니라면, 현재 x의 이전 원소는 idx[pos-1]에 해당하는 원소
  if (pos > 0) {
    prev[i] = idx[pos - 1];
  }
}

// tmp.length가 LIS의 길이
const lisLength = tmp.length;

// 마지막 원소의 인덱스부터 prev를 따라가며 복원
let lis = [];
let cur = idx[lisLength - 1];
while (cur !== -1) {
  lis.push(arr[cur]);
  cur = prev[cur];
}
lis.reverse();

console.log(lisLength);
console.log(lis.join(" "));
