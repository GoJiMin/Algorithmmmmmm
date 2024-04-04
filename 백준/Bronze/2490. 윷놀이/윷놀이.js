const input = require("fs")
.readFileSync("/dev/stdin")
.toString()
.trim()
.split("\n")
.map((el) => el.trim().split(" ").map(Number));

const result = ["D", "C", "B", "A", "E"];

for (let i = 0; i < input.length; i++) {
    const sum = input[i].reduce((acc, cur) => acc + cur);

    console.log(result[sum]);
}