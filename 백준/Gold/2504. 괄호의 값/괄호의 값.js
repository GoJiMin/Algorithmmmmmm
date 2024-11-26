const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim();

const stack = [];
let sum = 0;
let num = 1;

for (let i = 0; i < input.length; i++) {
  if (input[i] === "(") {
    num *= 2;
    stack.push("(");
  } else if (input[i] === "[") {
    num *= 3;
    stack.push("[");
  } else if (input[i] === ")") {
    if (stack.length === 0 || stack.at(-1) !== "(") {
      console.log(0);
      return;
    }

    if (input[i - 1] === "(") sum += num;
    stack.pop();
    num /= 2;
  } else if (input[i] === "]") {
    if (stack.length === 0 || stack.at(-1) !== "[") {
      console.log(0);
      return;
    }

    if (input[i - 1] === "[") sum += num;
    stack.pop();
    num /= 3;
  }
}

if (stack.length === 0) {
  console.log(sum);
} else {
  console.log(0);
}
