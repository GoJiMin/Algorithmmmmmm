const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

const ns = input.slice(1).map(Number);

const MAX = Math.max(...ns);
const MOD = 1_000_000_009;

const dp1 = Array(MAX + 1).fill(0);
const dp2 = Array(MAX + 1).fill(0);
const dp3 = Array(MAX + 1).fill(0);

if (MAX >= 1) dp1[1] = 1;
if (MAX >= 2) dp2[2] = 1;
if (MAX >= 3) {
  dp1[3] = (dp2[2] + dp3[2]) % MOD;
  dp2[3] = (dp1[1] + dp3[1]) % MOD;
  dp3[3] = 1;
}

for (let i = 4; i <= MAX; i++) {
  dp1[i] = (dp2[i - 1] + dp3[i - 1]) % MOD;
  dp2[i] = (dp1[i - 2] + dp3[i - 2]) % MOD;
  dp3[i] = (dp1[i - 3] + dp2[i - 3]) % MOD;
}

let result = [];
for (let n of ns) {
  const ans = (((dp1[n] + dp2[n]) % MOD) + dp3[n]) % MOD;
  result.push(ans);
}
console.log(result.join('\n'));
