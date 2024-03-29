const input = require("fs")
  .readFileSync(0)
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.split(" ").map(Number));

const [n, arr] = input;

let Y = 0;
let M = 0;

for (let i = 0; i < n; i++) {
  Y += ~~(arr[i] / 30 + 1) * 10;
}

for (let i = 0; i < n; i++) {
  M += ~~(arr[i] / 60 + 1) * 15;
}

if (Y > M) {
  console.log(`M ${M}`);
} else if (M > Y) {
  console.log(`Y ${Y}`);
} else {
  console.log(`Y M ${Y}`);
}
