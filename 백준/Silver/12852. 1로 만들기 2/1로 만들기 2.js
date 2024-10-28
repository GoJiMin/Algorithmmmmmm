const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim();

const n = Number(input);

const d = Array(n + 1).fill(0);
const pre = Array(n + 1).fill(0);

d[1] = 0;

for (let i = 2; i <= n; i++) {
  d[i] = d[i - 1] + 1;
  pre[i] = i - 1;

  if (i % 2 === 0 && d[i] > d[i / 2] + 1) {
    d[i] = d[i / 2] + 1;
    pre[i] = i / 2;
  }

  if (i % 3 === 0 && d[i] > d[i / 3] + 1) {
    d[i] = d[i / 3] + 1;
    pre[i] = i / 3;
  }
}

let cur = n;

const result = [];

while (true) {
  result.push(cur);
  if (cur === 1) break;
  cur = pre[cur];
}

console.log(d[n] + "\n" + result.join(" "));
