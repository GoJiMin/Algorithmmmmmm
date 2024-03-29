const input = require("fs")
  .readFileSync(0)
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.split(" ").map(Number));

const arr = Array(20)
  .fill(1)
  .map((v, i) => v + i);

for (let i = 0; i < input.length; i++) {
  const [a, b] = input[i];

  const swap = arr.splice(a - 1, b - a + 1).reverse();
  arr.splice(a - 1, 0, ...swap);
}

console.log(arr.join(" "));
