const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "script.txt")
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.trim());

const [word1, word2] = input;

const cnt1 = Array(26).fill(0);
const cnt2 = Array(26).fill(0);
let removeCnt = 0;

for (let i = 0; i < word1.length; i++) {
  cnt1[word1.charCodeAt(i) - 97]++;
}

for (let i = 0; i < word2.length; i++) {
  cnt2[word2.charCodeAt(i) - 97]++;
}

for (let i = 0; i < cnt1.length; i++) {
  removeCnt += Math.abs(cnt1[i] - cnt2[i]);
}

console.log(removeCnt);
