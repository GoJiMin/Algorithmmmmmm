const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const n = Number(input[0]);
const arr = [];

for (let i = 1; i <= n; i++) arr.push(input[i].split(" ").map(Number));

const result = [];

// 2중 for문을 사용.. 브루트포스인듯
// i = 0일 때, 55, 185임.
// j로 i !== j에 대해 각 몸무게와 키를 비교해 등수를 내면 될듯?
for (let i = 0; i < n; i++) {
  const [weightA, heightA] = arr[i];
  let rank = 1;

  for (let j = 0; j < n; j++) {
    const [weightB, heightB] = arr[j];

    // 키와 몸무게가 모두 B에 대비해서 크다면 넘어감.
    if (weightB < weightA && heightB < heightA) continue;
    // 둘 중 하나만 큰 경우 같은 누가 더 크다고 말할 수 없음.
    else if (weightB < weightA && heightA < heightB) continue;
    else if (weightA < weightB && heightB < heightA) continue;
    // 둘 다 작으면 rank 밀림.
    else if (weightA < weightB && heightA < heightB) rank++;
  }

  result.push(rank);
}

console.log(result.join(" "));
