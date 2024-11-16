const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

for (let i = 1; i <= +input[0]; i++) {
  const [a, b] = input[i].split(" ").map(Number);

  console.log(`Case #${i}: ${a} + ${b} = ${a + b}`);
}
