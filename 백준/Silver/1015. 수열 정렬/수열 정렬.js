const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

const n = Number(input[0]);
const arr = input[1].split(' ').map(Number);

const sorted = [...arr].sort((a, b) => a - b);
const p = Array(n);

for (let i = 0; i < n; i++) {
  const target = sorted[i];
  for (let j = 0; j < n; j++) {
    const cur = arr[j];

    if (target === cur) {
      arr[j] = -1;
      p[j] = i;
      break;
    }
  }
}

console.log(p.join(' '));
