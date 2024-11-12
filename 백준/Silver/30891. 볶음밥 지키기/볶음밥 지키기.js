const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

/**
 * 좌표가 주어집니다..
 * 주어진 공식에 맞는 X, Y 좌표를 구해야하는데
 * 밥알의 좌표가 -100부터 100까지이니 브루트포스로도 풀 수 있어보입니다.
 */

const [nr, ...arr] = input;

const [_, R] = nr.split(" ").map(Number);

const riceGrains = arr.map((el) => el.trim().split(" ").map(Number));

let maxCount = 0;
let ans = "";

for (let X = -100; X <= 100; X++) {
  for (let Y = -100; Y <= 100; Y++) {
    let count = 0;

    for (const [x, y] of riceGrains) {
      const squared = (X - x) ** 2 + (Y - y) ** 2;

      if (squared <= R ** 2) count++; // 그냥 양쪽 다 제곱합시다..
    }

    if (count > maxCount) {
      maxCount = count;
      ans = `${X} ${Y}`;
    }
  }
}

console.log(ans);
