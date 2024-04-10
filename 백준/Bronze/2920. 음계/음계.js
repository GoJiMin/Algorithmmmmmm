const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "script.txt")
  .toString()
  .trim()
  .split(" ");

const scale = ["c", "d", "e", "f", "g", "a", "b", "C"];
let result = "";

for (let i = 0; i < input.length; i++) {
  result += scale[input[i] - 1];
}

if (result === "cdefgabC") {
  console.log("ascending");
} else if (result === "Cbagfedc") {
  console.log("descending");
} else {
  console.log("mixed");
}
