const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim();

const n = Number(input);

const x = Math.floor(n / 5);
const y = x * 5 === n ? 0 : 1;

console.log(x + y);

