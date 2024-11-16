const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const result = [];

for (let i = 1; i <= +input[0]; i++) {
  const strs = input[i].trim();

  result.push(strs[0] + strs.at(-1));
}

console.log(result.join("\n"));
