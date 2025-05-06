const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim();

const [A, B, C] = input.split(' ').map(Number);

const x = C - B;

console.log(x <= 0 ? -1 : Math.floor(A / x) + 1);
