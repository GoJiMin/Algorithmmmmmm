const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

let idx = 0;
const t = Number(input[idx++]);

const result = [];
for (let i = 0; i < t; i++) {
  const n = Number(input[idx++]);
  const arr = input[idx++].split(' ').map(Number);

  let cur = arr[0];
  let max = arr[0];

  for (let i = 1; i < n; i++) {
    cur = Math.max(arr[i], cur + arr[i]);
    max = Math.max(cur, max);
  }

  result.push(max);
}

console.log(result.join('\n'));
