const input = require('fs').readFileSync(0).toString().split(" ").map(Number);

console.log(input.sort((a, b) => a - b).join(" "))