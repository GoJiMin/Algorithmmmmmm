const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const [lc, strs] = input;

const [l, c] = lc.split(" ");
const alps = strs.split(" ").sort();

const arr = [];
const VOWS = new Set(["a", "e", "i", "o", "u"]);

let result = "";

function solution(k, idx) {
  if (k === +l) {
    const vows = arr.filter((alp) => VOWS.has(alp)).length; // 모음의 갯수
    const cons = k - vows; // 자음의 갯수

    // 최소 2개의 자음과 최소 1개의 모음을 포함하는지 확인
    // arr.join(" ") 아님... 공백 필요 없는데 출력 형식 확인 잘 합시다. 3번이나 틀렸네
    if (vows > 0 && cons > 1) result += arr.join("") + "\n";

    return;
  }

  for (let i = idx; i < +c; i++) {
    arr[k] = alps[i];
    solution(k + 1, i + 1);
  }
}

solution(0, 0);

console.log(result);
