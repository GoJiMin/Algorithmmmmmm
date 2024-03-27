const input = require('fs').readFileSync(0).toString().split(" ").map(Number);

const arr = input.sort((a, b) => a - b);

if(arr[0] === arr[2]) {
    console.log(arr[0] * 1000 + 10000);
} else if(arr[0] === arr[1] || arr[1] === arr[2]) {
    console.log(arr[1] * 100 + 1000);
} else {
    console.log(arr[2] * 100)
}