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

console.log('1'.repeat(pad));
