const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim();

const map = new Map();

for (let i = 1; i <= 9; i++) {
  for (let j = 1; j <= 9; j++) {
    map.set(i * j);
  }
}

if (map.has(Number(input))) {
  console.log(1);
} else {
  console.log(0);
}
