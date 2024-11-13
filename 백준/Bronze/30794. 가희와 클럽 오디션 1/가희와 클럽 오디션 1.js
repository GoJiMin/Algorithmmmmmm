const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim();

const [lv, decision] = input.split(" ");

const decisions = {
  miss: 0,
  bad: 200,
  cool: 400,
  great: 600,
  perfect: 1000,
};

console.log(Number(lv) * decisions[decision]);
