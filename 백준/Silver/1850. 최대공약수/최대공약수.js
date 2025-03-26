const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim();

const [a, b] = input.split(' ').map(BigInt);

function gcd(a, b) {
  while (b !== 0n) {
    const r = a % b;

    a = b;
    b = r;
  }

  return a;
}

const pad = Number(gcd(a, b));

const result = [];
for (let i = 0; i < pad; i++) result.push(1);
console.log(result.join(''));
