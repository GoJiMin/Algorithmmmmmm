const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const result = [];

function check(strs) {
  const stack = [];

  for (let i = 0; i < strs.length; i++) {
    if (strs[i] === "(") {
      stack.push(strs[i]);
    } else {
      if (stack.length === 0 || stack.at(-1) !== "(") {
        return false;
      }

      stack.pop();
    }
  }

  if (stack.length === 0) {
    return true;
  } else {
    return false;
  }
}

for (let i = 1; i <= +input[0]; i++) {
  const strs = input[i].trim();

  if (check(strs)) {
    result.push("YES");
  } else {
    result.push("NO");
  }
}

console.log(result.join("\n"));
