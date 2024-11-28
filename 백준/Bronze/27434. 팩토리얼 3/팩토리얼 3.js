const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim();

function factorialDivideConquer(start, end) {
  if (start > end) return 1n;
  if (start === end) return BigInt(start);

  const mid = Math.floor((start + end) / 2);

  return (
    factorialDivideConquer(start, mid) * factorialDivideConquer(mid + 1, end)
  );
}

const n = parseInt(input);

console.log(n === 0 ? "1" : factorialDivideConquer(1, n).toString());
