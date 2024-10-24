const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const [n, ...arr] = input;

const co = arr.map((el) => el.trim().split(" ").map(Number));

co.sort((a, b) => {
  const [x1, y1] = a;
  const [x2, y2] = b;

  if (x1 === x2) {
    if (y1 < y2) return -1;
  }

  if (x1 < x2) return -1;
});

let result = "";

for (let i = 0; i < n; i++) {
  result += co[i].join(" ") + "\n";
}

console.log(result);
