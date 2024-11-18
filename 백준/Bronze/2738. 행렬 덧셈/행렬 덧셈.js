const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const [nm, ...arr] = input;

const [n, _] = nm.split(" ").map(Number);

const result = [];

for (let i = 0; i < n; i++) {
  const arrA = arr[i].split(" ").map(Number);
  const arrB = arr[i + n].split(" ").map(Number);

  const sum = arrA.map((numA, index) => numA + arrB[index]);

  result.push(sum);
}

for (let i = 0; i < n; i++) {
  console.log(result[i].join(" "));
}
