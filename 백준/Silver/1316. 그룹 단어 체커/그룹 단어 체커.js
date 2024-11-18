const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const n = Number(input[0]);

function groupCheck(word) {
  const isInitialized = new Map();

  let prev = "";

  for (let i = 0; i < word.length; i++) {
    if (prev !== word[i]) {
      if (isInitialized.has(word[i])) {
        return false;
      } else {
        isInitialized.set(word[i]);
        prev = word[i];
      }
    }

    prev = word[i];
  }

  return true;
}

let cnt = 0;

for (let i = 1; i <= n; i++) {
  if (groupCheck(input[i])) cnt++;
}

console.log(cnt);
