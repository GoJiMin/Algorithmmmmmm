const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim();

const n = Number(input);
const arr = input.split('').map(Number);
const len = arr.length;

const isUsed = Array(len).fill(false);

let min = Infinity;

const tmp = [];
function bt(k) {
  if (k === len) {
    const x = Number(tmp.join(''));

    if (n < Number(x)) min = Math.min(min, x);
  }

  for (let i = 0; i < len; i++) {
    if (!isUsed[i]) {
      isUsed[i] = true;
      tmp[k] = arr[i];
      bt(k + 1);
      isUsed[i] = false;
    }
  }
}

bt(0);

console.log(min === Infinity ? 0 : min);
