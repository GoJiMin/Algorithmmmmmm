const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

Set.prototype.difference = function (set) {
  const result = new Set(this);

  for (const value of set) {
    result.delete(value);
  }

  return result;
};

const elementsA = new Set(input[1].trim().split(" "));
const elementsB = new Set(input[2].trim().split(" "));

const diffA = elementsA.difference(elementsB);
const diffB = elementsB.difference(elementsA);

console.log(diffA.size + diffB.size);
