const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim();

const [strA, strB] = input.split("\n").map((s) => s.trim());

let isEqual = "";
let isIgnoreCaseEqual = "";

if (strA === "null") {
  isEqual = "NullPointerException";
  isIgnoreCaseEqual = "NullPointerException";
} else if (strB === "null") {
  isEqual = "false";
  isIgnoreCaseEqual = "false";
} else if (strA === strB) {
  isEqual = "true";
  isIgnoreCaseEqual = "true";
} else if (strA !== strB) {
  if (strA.toLowerCase() === strB.toLowerCase()) {
    isEqual = "false";
    isIgnoreCaseEqual = "true";
  } else {
    isEqual = "false";
    isIgnoreCaseEqual = "false";
  }
}

console.log(isEqual + "\n" + isIgnoreCaseEqual);
