const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim();

/**
 * 유클리드 호제법
 * 
 * 두 개의 자연수 a, b (단, a > b)에 대해 a를 b로 나눈 나머지가 r일 때, a와 b의 최대공약수는
   b와 r의 최대공약수와 같다.
 */

function gcd(a, b) {
  let r;

  while (b !== 0n) {
    r = a % b;

    a = b;
    b = r;
  }

  return a;
}

// a와 b의 최소공배수는 a와 b를 곱한 값과 a와 b의 최대공약수를 나눈 것과 같다.

function lcm(a, b) {
  return (a * b) / gcd(a, b);
}

const [a, b] = input.split(" ").map(BigInt);

console.log(lcm(a, b).toString());
