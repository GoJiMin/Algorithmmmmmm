const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const [nm, ...beforeTrim] = input;

const [n, m] = nm.split(" ").map(Number);
const arr = beforeTrim.map((el) => el.trim());

const map = new Map();

for (let i = 0; i < n; i++) {
  map.set(arr[i]);
}

let cnt = 0;
for (let i = n; i < n + m; i++) {
  if (map.has(arr[i])) cnt++;
}

console.log(cnt);
