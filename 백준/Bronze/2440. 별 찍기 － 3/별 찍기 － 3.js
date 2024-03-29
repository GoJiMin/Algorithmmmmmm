const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "script.txt")
  .toString();

for (let i = input; i > 0; i--) {
  console.log("*".repeat(i));
}
