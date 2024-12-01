const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const n = Number(input[0]);

function recursion(s, l, r, k) {
  if (l >= r) return `1 ${k}`;
  else if (s[l] !== s[r]) return `0 ${k}`;
  else return recursion(s, l + 1, r - 1, k + 1);
}

function isPalindrome(s) {
  return recursion(s, 0, s.length - 1, 1);
}

const result = [];

for (let i = 1; i <= n; i++) {
  result.push(isPalindrome(input[i].trim()));
}

console.log(result.join("\n"));
