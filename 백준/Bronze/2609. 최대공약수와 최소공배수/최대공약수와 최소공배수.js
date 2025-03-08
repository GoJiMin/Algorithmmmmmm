const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim();

/**
 * 유클리드 호제법..
 *
 * 두 개의 자연수 a, b가 있을 때, a를 b로 나눈 나머지가 r이라면, a, b의 최대공약수는 b와 r의 최대공약수와 같다
 *
 * a, b의 최소공배수는 (a * b) / (a와 b의 최대공약수)
 */

// gcd를 재귀함수로 구현한다면, x를 y로 나눈 나머지가 r일 때, y를 x로, r을 y에 대입한다.
// Base Case는 y === 0일 때, x return

function _gcd(x, y) {
  if (y === 0) return x;
  else return _gcd(y, x % y);
}

const [a, b] = input.split(" ").map(Number);

const gcd = _gcd(a, b);

console.log(gcd + "\n" + (a * b) / gcd);
