const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split(" ");

const N = Number(input[0]);
const K = Number(input[1]);

function findKthDivisor(N, K) {
  const divisors = [];

  for (let i = 1; i <= N; i++) {
    if (N % i === 0) {
      divisors.push(i);
    }
  }

  return divisors[K - 1] || 0;
}

console.log(findKthDivisor(N, K));
