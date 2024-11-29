const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const [n, ...people] = input;

const map = new Map();

/**
 * 총총이를 만나지 않은 사람은 춤을 추지 않음.
 * 하지만 총총이를 만난 이후의 사람은 춤을 춘다.
 * 그리고 총총이를 만난 사람과 접촉하면 그 사람도 춤을 춘다.
 */
for (let i = 0; i < n; i++) {
  const [a, b] = people[i].trim().split(" ");

  if (a === "ChongChong" || b === "ChongChong") {
    // 총총이를 만난 사람은 춤을 출 것이다.
    map.set(a);
    map.set(b);
  } else if (map.has(a) || map.has(b)) {
    // 총총이를 만난 사람과 만난 사람도 춤을 출 것이다.
    map.set(a);
    map.set(b);
  }
}

console.log(map.size);
