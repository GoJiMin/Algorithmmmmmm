const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const [N, K] = input[0].split(" ").map(Number);
const set = input[1].split(" ");

const stack = [];

let max = 0;

function rec(k) {
  if (k > N.toString().length) return;

  const num = parseInt(stack.slice(0, k).join(""));

  if (max <= num && N >= num) max = num;

  for (let i = 0; i < K; i++) {
    stack[k] = set[i];

    rec(k + 1);
  }
}

rec(0);

console.log(max);
