const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

/**
 * ENTER를 만나면 지금까지 저장된 객체의 사이즈를 카운트하고, 맵을 싹 비우기..
 * 만나기 전까지 전부 카운트하기..
 */

const map = new Map();

let cnt = 0;

for (let i = 1; i <= +input[0]; i++) {
  // ENTER라면 현재 저장된 map 객체의 size 값을 cnt에 추가.
  if (input[i].trim() === "ENTER") {
    cnt += map.size;
    map.clear(); // 이후에 다시 ENTER를 만나면 새로운 사람에게 환영해줌.
  } else {
    map.set(input[i].trim());
  }
}

cnt += map.size;

console.log(cnt);
