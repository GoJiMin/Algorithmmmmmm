const fs = require('fs');
const input = fs.readFileSync("/dev/stdin").toString().split("\n").map(el => el.split(" ").map(Number));

const [n, x] = input[0]
const arr = input[1]

function solution(n, x, arr) {
    arr.map((num) => num < x && console.log(num));
}

solution(n, x, arr)