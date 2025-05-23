const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

const [N, K, M] = input[0].split(' ').map(Number);
const lengths = input.slice(1).map(Number);

// 꼬다리 자르고 남은 거 계산
const trimmed = new Array(N);
for (let i = 0; i < N; i++) {
  const L = lengths[i];
  if (L <= K) {
    trimmed[i] = 0;
  } else if (L < 2 * K) {
    trimmed[i] = L - K;
  } else {
    trimmed[i] = L - 2 * K;
  }
}

let lo = 1;
let hi = Math.max(...trimmed);
let answer = -1;

while (lo <= hi) {
  const mid = Math.floor((lo + hi) / 2);
  let count = 0;

  for (const t of trimmed) {
    count += Math.floor(t / mid);
    if (count >= M) break; // 이미 충분하면 끝내기
  }

  if (count >= M) {
    answer = mid;
    lo = mid + 1;
  } else {
    hi = mid - 1;
  }
}

console.log(answer);
