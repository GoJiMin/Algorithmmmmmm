const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "script.txt")
  .toString()
  .trim();

let cnt = 0;
let num = 666;

while (true) {
  if ((num + "").includes("666")) {
    cnt++;
  }

  if (cnt === +input) {
    console.log(num);
    break;
  }

  num++;
}
