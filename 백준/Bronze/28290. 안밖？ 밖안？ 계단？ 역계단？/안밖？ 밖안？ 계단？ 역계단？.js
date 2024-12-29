const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim();

const table = {
  "fdsajkl;": "in-out",
  "jkl;fdsa": "in-out",
  "asdf;lkj": "out-in",
  ";lkjasdf": "out-in",
  "asdfjkl;": "stairs",
  ";lkjfdsa": "reverse",
};

console.log(table[input] || "molu");
