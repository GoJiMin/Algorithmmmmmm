const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

/**
 * 다음 이분 탐색 문제입니다..
 * 근데 문제 읽어보면 그냥 해시 쓰고 싶은데 먼저 풀어보고 해시로 풀어보겠습니다..
 * 이번엔 이전 문제와 비슷하나, 이번엔 등장 횟수를 구하라고 합니다.
 *
 * 그럼 이번엔 최초로 등장하는 인덱스와 가장 마지막에 등장하는 인덱스를 구하면, 등장 횟수를 구할 수 있겠네요.
 *
 * 다 풀었고.. 이번엔 해시로 풀어보겠습니다..
 */

const n = Number(input[0]);
const arrN = input[1].split(" ").map(Number);

const m = Number(input[2]);
const arrM = input[3].split(" ").map(Number);

const mapN = new Map();

// 있는 거 다 set하기..
for (let i = 0; i < n; i++) {
  if (mapN.has(arrN[i])) {
    mapN.set(arrN[i], mapN.get(arrN[i]) + 1);
  } else {
    mapN.set(arrN[i], 1);
  }
}

const result = [];
for (let i = 0; i < m; i++) {
  if (mapN.has(arrM[i])) result.push(mapN.get(arrM[i]));
  else result.push(0);
}

console.log(result.join(" "));
