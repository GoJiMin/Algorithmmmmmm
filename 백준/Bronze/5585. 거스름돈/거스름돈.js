const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim();

let change = 1000 - Number(input);

let cnt = 0;

[500, 100, 50, 10, 5, 1].forEach((coin) => {
  if (change / coin > 0) {
    cnt += Math.floor(change / coin);
    change %= coin;
  }
});

console.log(cnt);
