const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split(" ");

const [a, b, c] = input.map(BigInt);

function pow(a, b, c) {
  if (b === 1n) return a % c;

  let val = pow(a, b / 2n, c);
  val = (val * val) % c;

  if (b % 2n === 0n) return val;
  return (val * a) % c;
}

console.log(pow(a, b, c).toString());
