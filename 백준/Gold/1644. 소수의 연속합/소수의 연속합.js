const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim();

/**
 * 소수란, 약수로 1과 자신만 가지는 수....인데요..
 * 어떻게 풀지?
 *
 * 우선 소수를 판별해봅시다.. 에라토스테네스의 체..에 대해 알아봅시다..
 * 소수 자신을 제외한 배수를 모두 제거하고 남은 숫자는 모두 소수.. 라는 성질입니다..
 */

const n = Number(input);

function sieve(x) {
  const isPrime = new Array(x + 1).fill(true);

  // 0과 1은 소수가 아니죠..?
  isPrime[0] = false;
  isPrime[1] = false;

  for (let i = 2; i * i <= n; i++) {
    if (isPrime[i]) {
      // 만약 2부터 시작하는 경우라면, j의 초기값은 4로 시작해서.. 4 += 2, 6 += 2, 8 += 2... 2의 배수를 모두 지우겠죠..?
      // 만약 3이라면 j의 초기값은 9, 9 += 3, 12 += 3, 15 += 3... 3의 배수를 모두 지우겠구요..
      // 만약 5라면 j의 초기값은 25, 25 += 5, ... 이렇게 소수 자신을 제외한 배수를 모두 지워나가겠죠..?
      for (let j = i * i; j <= n; j += i) isPrime[j] = false;
    }
  }

  const primes = [];
  for (let i = 2; i <= n; i++) {
    if (isPrime[i]) primes.push(i);
  }

  return primes;
}

const primes = sieve(n);

// 미리 n까지의 소수들을 구해놓는다.. 어차피 N의 최대값은 4백만.. 시간제한 2초일 경우에,, 충분하겠죠?
// [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41];

let en = 0;
let tot = primes[0];

let cnt = 0;

for (let st = 0; st < primes.length; st++) {
  while (en < primes.length && tot < n) {
    en++;

    if (en !== primes.length) tot += primes[en];
  }

  if (en === primes.length) break;
  if (tot === n) cnt++;

  tot -= primes[st];
}

console.log(cnt);
