const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim();

const suffix = [];

for (let i = 0; i < input.length; i++) {
  suffix.push(input.slice(i, input.length));
}

suffix.sort();

console.log(suffix.join("\n"));
