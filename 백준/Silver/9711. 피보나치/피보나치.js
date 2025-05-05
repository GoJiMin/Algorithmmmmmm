const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

let idx = 0;
const T = Number(input[idx++]);

const result = [];
for (let t = 1; t <= T; t++) {
  const [P, Q] = input[idx++].split(' ').map(Number);

  if (P === 1 || P === 2) {
    result.push(`Case #${t}: ${1 % Q}`);
    continue;
  }

  let a = 1;
  let b = 1;
  let c;

  for (let i = 3; i <= P; i++) {
    c = (a + b) % Q;
    a = b;
    b = c;
  }

  result.push(`Case #${t}: ${b}`);
}

console.log(result.join('\n'));
