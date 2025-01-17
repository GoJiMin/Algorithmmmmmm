const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const n = Number(input[0]);

const result = [];

for (let i = 1; i <= n; i++) {
  const [a, b] = input[i].split(",").map(Number);

  result.push(a + b);
}

console.log(result.join("\n"));
