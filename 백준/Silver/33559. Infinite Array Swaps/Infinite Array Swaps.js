const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const n = Number(input[0]);

const arrA = input[1].split(" ").map(Number);
const arrB = input[2].split(" ").map(Number);

// 빈도수 기록 좀 해보죠?
const freqA = new Map();
const freqB = new Map();
for (let i = 0; i < n; i++) {
  freqA.set(arrA[i], (freqA.get(arrA[i]) || 0) + 1);
  freqB.set(arrB[i], (freqB.get(arrB[i]) || 0) + 1);
}

// 공통되는 수가 얼마나 필요한지
// 어차피 3개 2개 필요하면 2개만 같은 인덱스에 두니까 min으로 set
const needed = new Map();
for (const [num, howManyA] of freqA.entries()) {
  const howManyB = freqB.get(num) || 0;
  needed.set(num, Math.min(howManyA, howManyB));
}

const matchedA = [];
const dummyA = [];

const matchedB = [];
const dummyB = [];

const usedA = new Map();
const usedB = new Map();
for (let i = 0; i < n; i++) {
  // A 배열 처리
  const used_A = usedA.get(arrA[i]) || 0;
  const need_A = needed.get(arrA[i]) || 0;

  if (used_A < need_A) {
    // 아직 필요한 양만큼 안 썼으면 결과에 추가하고 사용한 횟수를 증가
    matchedA.push(arrA[i]);
    usedA.set(arrA[i], used_A + 1);
  } else {
    // 필요하지 않으면 쓰레기통에 넣어놓기
    dummyA.push(arrA[i]);
  }

  // B 배열 처리
  const used_B = usedB.get(arrB[i]) || 0;
  const need_B = needed.get(arrB[i]) || 0;

  if (used_B < need_B) {
    matchedB.push(arrB[i]);
    usedB.set(arrB[i], used_B + 1);
  } else {
    dummyB.push(arrB[i]);
  }
}

console.log(matchedA.length);
// 정렬 안 해주면 뒤죽박죽..
console.log(
  matchedA.sort((a, b) => a - b).join(" ") +
    (dummyA.length > 0 ? " " : "") +
    dummyA.join(" ")
);
console.log(
  matchedB.sort((a, b) => a - b).join(" ") +
    (dummyB.length > 0 ? " " : "") +
    dummyB.join(" ")
);
