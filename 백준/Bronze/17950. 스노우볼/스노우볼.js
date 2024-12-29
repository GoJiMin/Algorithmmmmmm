const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const [h, x] = input[0].split(" ").map(Number);
const M = 1_000_000_007;

const c = input.slice(1).map(Number);

const pow = new Array(h + 1);
pow[0] = 1;
for (let i = 1; i <= h; i++) {
  pow[i] = (BigInt(pow[i - 1]) * BigInt(x)) % BigInt(M);
}

let total = 0n;
for (let i = 1; i <= h; i++) {
  const count = BigInt(c[i - 1]);
  total = (total + count * pow[i]) % BigInt(M);
}

console.log(total.toString());
