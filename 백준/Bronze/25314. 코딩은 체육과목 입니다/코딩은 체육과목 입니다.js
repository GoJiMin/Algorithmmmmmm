const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim();

const cnt = Number(input) / 4;

const template = "long ".repeat(cnt);

console.log(template + "int");
