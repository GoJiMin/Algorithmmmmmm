const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "script.txt")
  .toString()
  .trim()
  .split("\n");

const ans = [];

for (let s of input) {
  const stack = [];
  let result = true;

  if (s[0] === ".") {
    continue;
  }

  for (let i = 0; i < s.length; i++) {
    if (s[i] === "[" || s[i] === "(") {
      stack.push(s[i]);
    }

    if (s[i] === "]") {
      if (stack.length === 0) {
        result = false;
        break;
      }

      if (stack.at(-1) === "[") {
        stack.pop();
      } else {
        result = false;
        break;
      }
    }

    if (s[i] === ")") {
      if (stack.length === 0) {
        result = false;
        break;
      }

      if (stack.at(-1) === "(") {
        stack.pop();
      } else {
        result = false;
        break;
      }
    }
  }

  if (result) {
    stack.length === 0 ? ans.push("yes") : ans.push("no");
  } else {
    ans.push("no");
  }
}

console.log(ans.join("\n"));
