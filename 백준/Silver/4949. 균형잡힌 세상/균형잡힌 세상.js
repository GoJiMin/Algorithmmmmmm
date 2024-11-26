const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const result = [];

input.forEach((strs) => {
  if (strs === ".") return;

  const stack = [];

  for (let i = 0; i < strs.length; i++) {
    if (strs[i] === "(" || strs[i] === "[") stack.push(strs[i]);

    if (strs[i] === ")") {
      if (stack.length === 0 || stack.at(-1) !== "(") {
        result.push("no");

        return;
      }

      stack.pop();
    }

    if (strs[i] === "]") {
      if (stack.length === 0 || stack.at(-1) !== "[") {
        result.push("no");

        return;
      }

      stack.pop();
    }
  }

  if (stack.length === 0) {
    result.push("yes");
  } else {
    result.push("no");
  }
});

console.log(result.join("\n"));
