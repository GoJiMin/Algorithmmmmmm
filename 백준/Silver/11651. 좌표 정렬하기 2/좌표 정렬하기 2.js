const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const [n, ...arr] = input;

const co = arr.map((el) => el.trim().split(" ").map(Number));

co.sort((a, b) => a[1] - b[1] || a[0] - b[0]);

let result = "";

for (let i = 0; i < n; i++) {
  result += co[i].join(" ") + "\n";
}

console.log(result);
