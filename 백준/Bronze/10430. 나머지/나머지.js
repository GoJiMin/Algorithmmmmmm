const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split(" ")
  .map(Number);

const [A, B, C] = input;

const result = [
  (A + B) % C,
  ((A % C) + (B % C)) % C,
  (A * B) % C,
  ((A % C) * (B % C)) % C,
];

console.log(result.join("\n"));
