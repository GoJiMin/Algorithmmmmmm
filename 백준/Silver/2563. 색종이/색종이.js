const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

/**
 * 넓이라는게.. 그냥
 [
  0, 0, 0, 0, 0
  0, 1, 1, 1, 0
  0, 1, 1, 1, 0
 ]
 * 여기 1의 개수 아니겠습니까..? 가로 3, 세로 2.. 넓이는 6..
 */

const n = Number(input[0]);

const papers = Array.from({ length: 101 }, () => Array(101).fill(0));

for (let i = 1; i <= n; i++) {
  const [w, h] = input[i].split(" ").map(Number);

  for (let j = w; j < w + 10; j++) {
    for (let k = h; k < h + 10; k++) {
      papers[j][k] = 1;
    }
  }
}

let cnt = 0;

for (let i = 0; i < 101; i++) {
  for (let j = 0; j < 101; j++) {
    cnt += papers[i][j];
  }
}

console.log(cnt);
