const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

/**
 * 1의 자리 정수 중 찐 Even Number는
 * 0, 2, 4, 6, 8
 *
 * 2의 자리 정수 중 찐 Even Number는 0으로 시작하는 수를 제외한 나머지 모든 수가 5개씩 취할 수 있음.
 * ex) 20, 22, 24, 26, 28, ... 88 => 4 * 5 = 20.
 *
 * 3의 자리 정수 중 찐 Even Number도 위와 같음.
 * 4 * 5 * 5 = 100.
 *
 * 그럼 4 * 5 ** N - 1임. 그럼 N은 1일 때 4처리만해주면 됨.
 */

const MOD = BigInt(1_000_000_007);
const Q = Number(input[0]);

// 거듭제곱을 분할 계산..
function divPow(base, exp, mod) {
  let result = BigInt(1);
  base = BigInt(base) % mod;

  while (exp > 0) {
    if (exp % 2 === 1) {
      result = (result * base) % mod;
    }
    base = (base * base) % mod;
    exp = Math.floor(exp / 2);
  }

  return result;
}

const result = [];

for (let i = 1; i <= Q; i++) {
  const N = Number(input[i]);

  if (N === 1) {
    result.push(5);
  } else {
    const pow = divPow(5, N - 1, MOD);
    result.push((4n * pow) % MOD);
  }
}

console.log(result.map((x) => x.toString()).join("\n"));
