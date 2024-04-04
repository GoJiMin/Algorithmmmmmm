// const input = require("fs")
//   .readFileSync(process.platform === "linux" ? "/dev/stdin" : "script.txt")
//   .toString()
//   .trim()
//   .split("\n")
//   .map((el) => el.trim().split(" "));

// const [[n], ...arr] = input;

// const stack = [];
// let answer = "";

// function push(x) {
//   stack.push(x);
// }

// function pop() {
//   answer += (stack.pop() || -1) + "\n";
// }

// function size() {
//   answer += stack.length + "\n";
// }

// function empty() {
//   answer += (stack.length === 0 ? 1 : 0) + "\n";
// }

// function top() {
//   answer += (stack.at(-1) || -1) + "\n";
// }

// for (let i = 0; i < n; i++) {
//   switch (arr[i][0]) {
//     case "push":
//       push(arr[i][1]);
//       break;
//     case "pop":
//       pop();
//       break;
//     case "size":
//       size();
//       break;
//     case "empty":
//       empty();
//       break;
//     case "top":
//       top();
//       break;
//   }
// }

// console.log(answer);
const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "script.txt")
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.trim().split(" "));

const [[n], ...arr] = input;

const stack = [];
let pos = 0;
let answer = "";

function push(x) {
  stack[pos++] = x;
}

function pop() {
  if (stack[pos - 1]) {
    answer += stack[pos - 1] + "\n";
    pos--;
  } else {
    answer += -1 + "\n";
  }
}

function size() {
  answer += pos + "\n";
}

function empty() {
  answer += (pos === 0 ? 1 : 0) + "\n";
}

function top() {
  answer += (stack[pos - 1] || -1) + "\n";
}

for (let i = 0; i < n; i++) {
  switch (arr[i][0]) {
    case "push":
      push(arr[i][1]);
      break;
    case "pop":
      pop();
      break;
    case "size":
      size();
      break;
    case "empty":
      empty();
      break;
    case "top":
      top();
      break;
  }
}

console.log(answer);
