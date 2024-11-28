const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

/**
 * 제곱될 때 4주기로 1의 자리 수가 다시 돌아옴..
 * 2, 4, 8, 16, 32...
 * 3, 9, 27, 81, 243..
 * 4, 16, 64, 256, 1024..
   ...
 * 7, 49, 343, 2401, 16807...
 */

const result = [];

for (let i = 1; i <= +input[0]; i++) {
  const [a, b] = input[i].split(" ").map(Number);

  const lastDigit = a % 10;

  if (lastDigit === 0) {
    result.push(10);
    continue;
  }

  const mod = b % 4 === 0 ? 4 : b % 4;
  const ones = lastDigit ** mod % 10;

  result.push(ones);
}

console.log(result.join("\n"));
