const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const [n, ...arr] = input;

const times = arr.map((el) => el.trim().split(" ").map(Number));

times.sort((a, b) => a[1] - b[1] || a[0] - b[0]);

let prevT = times[0][1];
let cnt = 1;

for (let i = 1; i < n; i++) {
  if (times[i][0] < prevT) continue;

  cnt++;
  prevT = times[i][1];
}

console.log(cnt);
