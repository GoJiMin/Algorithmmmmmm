const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

/**
 * 빗변 길이의 제곱은 다른 두 변의 길이의 제곱의 합과 같아야 직각삼각형..
 */

const n = Number(input[0]);

const result = [];

for (let i = 1; i <= n; i++) {
  const [a, b, c] = input[i]
    .trim()
    .split(" ")
    .map(Number)
    .sort((a, b) => a - b);

  let testCase = `Scenario #${i}:\n`;

  if (c ** 2 === a ** 2 + b ** 2) {
    testCase += "yes";
  } else {
    testCase += "no";
  }

  result.push(testCase);
}

console.log(result.join("\n\n"));
