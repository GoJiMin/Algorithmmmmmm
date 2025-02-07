const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

/**
 * 눈사람은 아래 눈덩이가 더 커야만 해요. 자명하죠..? 그렇지 않으면, 눈사람이 무너질테니까요.
 * 그럼 우선 주어진 눈덩이를 정렬하고 시작해야 돼요. 인덱스를 옮길 때 (위, 아래) 형식으로 눈덩이를 선택해야 하니까요!
 * [2, 3, 5, 5, 9] 형태로 정렬된 눈덩이를 보면, 문제 예시에서 정답인 경우를 2개 들어줬는데요.
 * (2, 9), (5, 5) | (2, 5), (3, 5) => (가장 작은, 가장 큰), (두 번째로 작은, 두 번째로 큰)
 * 형태로 눈덩이를 선택하고 있어요. 가장 좋은 pairing을 그리디하게 찾는 느낌도 있는데요..
 * 어쨌든, i1 < j1 < j2 < i2 형태로 골랐을 때, (i1 < i2)와 (j1 < j2)를 충족하니 눈사람의 형태도 충족해요.
 */

const n = Number(input[0]);
const snowball = input[1].split(" ").map(Number);

snowball.sort((a, b) => a - b);

let ans = Number.MAX_SAFE_INTEGER;

for (let elsa1 = 0; elsa1 < n; elsa1++) {
  for (let elsa2 = elsa1 + 3; elsa2 < n; elsa2++) {
    let anna1 = elsa1 + 1;
    let anna2 = elsa2 - 1;

    while (anna1 < anna2) {
      const elsaSnowman = snowball[elsa1] + snowball[elsa2];
      const annaSnowman = snowball[anna1] + snowball[anna2];

      ans = Math.min(ans, Math.abs(elsaSnowman - annaSnowman));

      if (elsaSnowman < annaSnowman) anna2--;
      else anna1++;
    }
  }
}

console.log(ans);
