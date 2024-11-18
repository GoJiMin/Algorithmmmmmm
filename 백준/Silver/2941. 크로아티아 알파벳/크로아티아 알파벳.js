const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim();

const croatianAlphabets = [
  /c=/g,
  /c-/g,
  /dz=/g,
  /d-/g,
  /lj/g,
  /nj/g,
  /s=/g,
  /z=/g,
];

let word = input;

for (let i = 0; i < 8; i++) {
  word = word.replace(croatianAlphabets[i], "x");
}

console.log(word.length);
