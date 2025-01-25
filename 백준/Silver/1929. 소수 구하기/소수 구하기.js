const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim();

const [m, n] = input.split(" ").map(Number);

function seive(st, en) {
  const isPrime = Array(en + 1).fill(true);

  isPrime[0] = false;
  isPrime[1] = false;

  for (let i = 2; i * i <= en; i++) {
    if (isPrime[i]) {
      for (let j = i * i; j <= n; j += i) isPrime[j] = false;
    }
  }

  const primes = [];

  for (let i = st; i <= en; i++) {
    if (isPrime[i]) primes.push(i);
  }

  return primes;
}

const result = seive(m, n);

console.log(result.join("\n"));
