const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

/**
 * 우선 분모 둘의 최소공배수를 구하고 각 분자에 자신의 분모를 나눈 값을 곱해서 더해주면 하나의 분수로 표현할 수 있겠고..
 *
 * 그리고 분자와 분모의 최대공약수를 구해서 나누면 될듯?
 */

let [numA, denoA] = input[0].split(' ').map(Number);
let [numB, denoB] = input[1].split(' ').map(Number);

function _gcd(a, b) {
  while (b !== 0) {
    const r = a % b;

    a = b;
    b = r;
  }

  return a;
}

function _lcm(a, b) {
  return (a * b) / _gcd(a, b);
}

const lcm = _lcm(denoA, denoB);

numA *= lcm / denoA;
numB *= lcm / denoB;

const resultNum = numA + numB;
const gcd = _gcd(resultNum, lcm);

console.log(resultNum / gcd, lcm / gcd);
