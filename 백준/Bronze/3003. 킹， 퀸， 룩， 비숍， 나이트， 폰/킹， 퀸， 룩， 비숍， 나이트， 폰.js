const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim();

const pieces = [1, 1, 2, 2, 2, 8];

const inputPieces = input.split(" ").map(Number);

const result = pieces.map((piece, index) => piece - inputPieces[index]);

console.log(result.join(" "));
