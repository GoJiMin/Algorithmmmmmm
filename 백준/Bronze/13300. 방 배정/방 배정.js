const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "script.txt")
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.split(" ").map(Number));

const girl = [0, 0, 0, 0, 0, 0, 0];
const man = [0, 0, 0, 0, 0, 0, 0];
let room = 0;

const [[n, k], ...students] = input;

for (let i = 0; i < n; i++) {
  if (students[i][0] === 0) {
    girl[students[i][1]]++;
  } else {
    man[students[i][1]]++;
  }
}

for (let i = 1; i <= 6; i++) {
  room += Math.ceil(girl[i] / k);
  room += Math.ceil(man[i] / k);
}

console.log(room);
