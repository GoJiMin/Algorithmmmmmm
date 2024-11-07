const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const [nm, ...arr] = input;

const [n, m] = nm.split(" ").map(Number);
const people = arr.map((el) => el.trim());

/**
 * N개의 줄에 걸쳐 듣도 못한 사람.
 * 이후  M개의 줄에 걸쳐 보도 못한 사람.
 * 띄어쓰기, 무조건 소문자. 서로 중복 없음.
 * 듣도 보도 못한 사람의 명단을 출력.
 *
 * peoples 배열을 N까지 순회하며 각 이름을 Map 객체에 할당합시다..
 * 이후에 N부터 M까지 순회하며 각 이름을 다시 Map 객체에 할당합시다..
 * 마지막으로 Map 객체를 순회하며 카운트 횟수가 2이상인 이름을 정렬해 출력합시다..
 *
 * 시간복잡도
 - Map 객체에 대한 조회와 삽입은 O(1), N명과 M명을 순회하므로 O(N + M)
 - 결과 배열을 정렬할 때 O(K log K).. K는 듣보잡의 수로 min(N, M)
 - 따라서 전체 시간 복잡도는 O(N + M + K log K) 최악을 상정했을 때 천만 정도..?
 */

const deutbojap = new Map();

function checkDeutbojap(person) {
  if (deutbojap.has(person)) {
    deutbojap.set(person, 2);
  } else {
    deutbojap.set(person, 1);
  }
}

for (let i = 0; i < n; i++) {
  checkDeutbojap(people[i]);
}

for (let i = n; i < n + m; i++) {
  checkDeutbojap(people[i]);
}

const ans = [];

for (const [name, count] of deutbojap) {
  if (count === 2) ans.push(name);
}

ans.sort();

console.log(ans.length + "\n" + ans.join("\n"));
