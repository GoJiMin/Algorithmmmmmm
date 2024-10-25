const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const [nc, arr] = input;

const [_, c] = nc.split(" ").map(Number);
const messages = arr.split(" ").map(Number);

const cnt = new Map();

for (let msg of messages) {
  if (cnt.size < c || cnt.has(msg)) cnt.set(msg, (cnt.get(msg) || 0) + 1);
}

const sorted = [...cnt].sort((a, b) => b[1] - a[1] || 0);

const result = sorted.map(([num, repeat]) => `${num} `.repeat(repeat));

console.log(result.join(""));
