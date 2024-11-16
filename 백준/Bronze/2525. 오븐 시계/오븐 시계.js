const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

let [hour, minutes] = input[0].split(" ").map(Number);
const endT = Number(input[1]);

const added = minutes + endT;

if (added >= 60) {
  hour += Math.floor(added / 60);
  minutes = added % 60;
} else {
  minutes = added;
}

console.log(hour >= 24 ? hour % 24 : hour, minutes);
