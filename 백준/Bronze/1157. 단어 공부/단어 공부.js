const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "script.txt")
  .toString()
  .trim();

const word = input.toLowerCase();

const cnt = Array(26).fill(0);
let max = 0;
let ans = "";

for (let i = 0; i < word.length; i++) {
  cnt[word.charCodeAt(i) - 97]++;
}

for (let i = 0; i < cnt.length; i++) {
  if (max < cnt[i]) {
    max = cnt[i];
    ans = String.fromCharCode(i + 97);
  } else if (max === cnt[i]) {
    ans = "?";
  }
}

console.log(ans.toUpperCase());