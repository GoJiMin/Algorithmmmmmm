const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const target = Number(input[0]);

const n = Number(input[1]);

let val = 0;

for (let i = 0; i < n; i++) {
  const [price, num] = input[i + 2].split(" ").map(Number);

  val += price * num;
}

if (target === val) console.log("Yes");
else console.log("No");
