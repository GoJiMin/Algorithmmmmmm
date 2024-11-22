const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim();

const strs = [];

function recursion(start, end, str) {
  if (start >= str.length) return;

  if (end > str.length) {
    recursion(start + 1, start + 2, str);
    return;
  }

  strs.push(str.slice(start, end));

  recursion(start, end + 1, str);
}

recursion(0, 1, input);

const setStrs = new Set(strs);

console.log(setStrs.size);
