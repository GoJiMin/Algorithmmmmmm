const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

/**
 * 해시를 사용하는 문제인데요..
 *
 * 일단 구현 목록부터 정해봅시다.
 * 1. 두 번 클릭한 사용자는 대기열의 맨 뒤로 이동.
 *  => 이거 아마 맵에서 아예 삭제해버리면 틀릴 거 같은데요. 이거 신경 써서 구현해야겠네요.
 * 2. 맵 객체에 저장할 때 인덱스를 함께 저장?
 */

const [K, L] = input[0].split(" ").map(Number);

const map = new Map();

for (let i = 1; i <= L; i++) {
  // 맵 객체에 저장되어 있다면, 제거하고, 현재 인덱스로 다시 저장?
  const id = input[i].trim();

  // 이미 눌렀니?
  if (map.has(id)) {
    map.delete(id);

    // 뒤로 가라.
    map.set(id);
  } else {
    map.set(id);
  }
}

const result = [];

let idx = 1;
for (const [key] of map) {
  if (idx++ > K) break;

  result.push(key);
}

console.log(result.join("\n"));
