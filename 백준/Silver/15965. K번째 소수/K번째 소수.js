const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString();

const K = Number(input);

const upper = K < 6 ? 15 : Math.floor(K * (Math.log(K) + Math.log(Math.log(K)))) + 5;

const isPrime = Array(upper + 1).fill(true);
isPrime[0] = false;
isPrime[1] = false;

for (let i = 2; i * i <= upper; i++) {
  if (isPrime[i]) {
    for (let j = i * i; j <= upper; j += i) {
      isPrime[j] = false;
    }
  }
}

let count = 0;
for (let i = 2; i <= upper; i++) {
  if (isPrime[i]) {
    count++;
    if (count === K) {
      console.log(i);
      break;
    }
  }
}