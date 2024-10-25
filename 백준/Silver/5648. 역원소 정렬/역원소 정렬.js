const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n")
  .filter((line) => line.trim() !== ""); // 하.. 빈 줄 입력은 억까지 않아요?

const arrList = input.map((el) => el.trim().split(" "));

const n = arrList[0].shift();

const tmp = [];

for (let i = 0; i < arrList.length; i++) {
  for (let j = 0; j < arrList[i].length; j++) {
    const reversed = [...arrList[i][j]].reverse().join("");

    tmp.push(Number(reversed));
  }
}

tmp.sort((a, b) => a - b);

let result = "";

for (let i = 0; i < +n; i++) {
  result += tmp[i] + "\n";
}

console.log(result);
