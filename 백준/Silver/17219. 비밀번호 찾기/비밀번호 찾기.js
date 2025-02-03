const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

/**
 * 거저먹는 실버 해시 문제..
 */

const [n, m] = input[0].split(" ").map(Number);

const passwordMap = new Map();

for (let i = 1; i <= n; i++) {
  const [site, password] = input[i].trim().split(" ");

  passwordMap.set(site, password);
}

const result = [];

for (let i = n + 1; i <= n + m; i++)
  result.push(passwordMap.get(input[i].trim()));

console.log(result.join("\n"));
