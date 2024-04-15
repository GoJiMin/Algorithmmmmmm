const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "script.txt")
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.trim());

const [n, ...arr] = input;

arr.sort((a, b) => a.length - b.length || a.localeCompare(b));

const removeDup = new Set(arr);
const result = [];
removeDup.forEach((word) => result.push(word));

console.log(result.join("\n"));
