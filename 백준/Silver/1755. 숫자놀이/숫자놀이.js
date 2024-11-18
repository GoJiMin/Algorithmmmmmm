const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split(" ")
  .map(Number);

const table = {
  0: "zero",
  1: "one",
  2: "two",
  3: "three",
  4: "four",
  5: "five",
  6: "six",
  7: "seven",
  8: "eight",
  9: "nine",
};

const [m, n] = input;

const convertString = (num) => {
  return [...num.toString()].map((digit) => table[digit]).join(" ");
};

const arr = [];
for (let i = m; i <= n; i++) {
  arr.push(i);
}

arr.sort((a, b) => {
  const convertedA = convertString(a);
  const convertedB = convertString(b);

  return convertedA.localeCompare(convertedB);
});

const result = [];
for (let i = 0; i < arr.length; i += 10) {
  result.push(arr.slice(i, i + 10).join(" "));
}

console.log(result.join("\n"));
