const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

/*
  n = 5, m = 3
  setA = [8, 1, 7, 3, 1]
  setB = [3, 6, 1]
  v = [
  { value: 1, isB: false },
  { value: 1, isB: false },
  { value: 1, isB: true },
  { value: 3, isB: false },
  { value: 3, isB: true },
  { value: 6, isB: true },
  { value: 7, isB: false },
  { value: 8, isB: false }
  ]
  뭔지 알겠죠?
*/

const t = Number(input.shift());

const result = [];

for (let i = 0; i < t; i++) {
  const [nm, A, B] = input.splice(0, 3);

  const [n, m] = nm.split(" ").map(Number);

  const setA = A.split(" ").map(Number);
  const setB = B.split(" ").map(Number);

  const v = [];

  for (let i = 0; i < n; i++) {
    v.push({ value: setA[i], isB: false });
  }

  for (let i = 0; i < m; i++) {
    v.push({ value: setB[i], isB: true });
  }

  v.sort((a, b) => a.value - b.value);

  let cnt = 0;
  let ans = 0;

  for (let i = 0; i < n + m; i++) {
    if (!v[i].isB) {
      ans += cnt;
    } else {
      cnt++;
    }
  }

  result.push(ans);
}

console.log(result.join("\n"));
