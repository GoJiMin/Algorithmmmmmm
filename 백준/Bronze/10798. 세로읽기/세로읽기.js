const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const boards = input.map((el) => el.trim().split(""));

let ans = "";
for (let i = 0; i < 15; i++) {
  for (let j = 0; j < 5; j++) {
    if (boards[j] && boards[j][i]) {
      ans += boards[j][i];
    }
  }
}

console.log(ans);
