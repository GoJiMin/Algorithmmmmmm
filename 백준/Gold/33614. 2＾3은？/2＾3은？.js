const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

let idx = 0;
const t = Number(input[idx++]);
const MOD = 100_000_0007;

const result = [];
for (let i = 0; i < t; i++) {
  const [p, q, r] = input[idx++].split(' ').map(Number);

  const count1 = Math.min(q, r);
  const count2 = p > 1 ? p - 1 : 0;

  result.push((count1 + count2) % MOD);
}

console.log(result.join('\n'));
