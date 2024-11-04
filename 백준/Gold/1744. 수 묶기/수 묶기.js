const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n")
  .map(Number);

const [n, ...arr] = input;

let ans = 0;
const seqP = [];
const seqN = [];

for (let i = 0; i < n; i++) {
  const t = arr[i];
  if (t === 1) {
    ans++; // 1은 묶지 않고 바로 더하는 것이 유리
  } else if (t > 0) {
    seqP.push(t); // 양수는 seqP 배열에 추가
  } else {
    seqN.push(t); // 음수는 seqN 배열에 추가
  }
}

// 내림차순으로 양수를 정렬해 큰 값끼리 묶음
seqP.sort((a, b) => a - b);
// 오름차순으로 음수를 정렬해 작은 값끼리 묶음
seqN.sort((a, b) => b - a);

function seqSum(v) {
  while (v.length > 1) {
    ans += v.pop() * v.pop(); // 마지막 두 수를 꺼내어 곱함
  }
  if (v.length) {
    ans += v[0]; // 남은 값이 있으면 더함
  }
}

seqSum(seqP);
seqSum(seqN);

console.log(ans);
