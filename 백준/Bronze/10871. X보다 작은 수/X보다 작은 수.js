const input = require('fs').readFileSync("/dev/stdin").toString().trim().split("\n").map(el => el.split(" "))

const [n, x] = input[0]
const arr = input[1]

console.log(arr.filter(num => +num < +x).join(" "))