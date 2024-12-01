const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

/**
 * 1. 빈도수로 정렬.
 * 2. 같은 빈도수면 길이 순으로 정렬.
 * 3. 1,2가 겹친다면 마지막으로 알파벳 사전 순으로 정렬.
 * 입력의 첫째 줄은 n, m
 */

const [n, m] = input[0].split(" ").map(Number);

const map = new Map();

for (let i = 1; i <= n; i++) {
  // 길이가 m 이상인 문자열만 map에 기록.
  const cur = input[i].trim();

  if (cur.length >= m) map.set(cur, (map.get(cur) || 0) + 1);
}

const mapArr = [...map];

// mappArr = [ [ 단어, 빈도수 ], ... ]
mapArr.sort(
  ([strA, freqA], [strB, freqB]) =>
    freqB - freqA || strB.length - strA.length || strA.localeCompare(strB)
);

const result = [];

for (let i = 0; i < mapArr.length; i++) {
  result.push(mapArr[i][0]);
}

console.log(result.join("\n"));
