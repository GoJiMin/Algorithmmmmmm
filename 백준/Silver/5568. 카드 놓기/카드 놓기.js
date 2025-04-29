const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

// 백트래킹으로 '1', '2'인 경우에 문자열 합으로 '12'를 만들고 set에 중복 검사하면 될듯?
let idx = 0;

const n = Number(input[idx++]);
const K = Number(input[idx++]);

const arr = [];
const isUsed = Array(n).fill(false);

for (let i = 0; i < n; i++) arr.push(input[idx++].trim());

const tmp = [];
const set = new Set();

function bt(k) {
  if (k === K) {
    set.add(tmp.join(''));

    return;
  }

  for (let i = 0; i < n; i++) {
    if (!isUsed[i]) {
      tmp[k] = arr[i];
      isUsed[i] = true;
      bt(k + 1);
      isUsed[i] = false;
    }
  }
}

bt(0);
console.log(set.size);
