const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

/**
 * 하.. 문제 다 읽었는데.. 쓸모 없는 내용이었군요.. 그냥 입력만 볼걸
 * 해시 사용하는 건데 인덱스도 같이 넣으면 되겠습니다.
 * node는 항상 개행문자가 들어가있어서 trim을 안 하면 \r이 같이 나옵니다..
 */

const [n, m] = input[0].split(" ").map(Number);

const pokemonsName = new Map();
const pokemonsIndex = new Map();

for (let i = 1; i <= n; i++) {
  pokemonsName.set(input[i].trim(), i);
  pokemonsIndex.set(i, input[i].trim());
}

const result = [];

for (let i = n + 1; i <= n + m; i++) {
  if (Number(input[i])) {
    result.push(pokemonsIndex.get(Number(input[i])));
  } else {
    result.push(pokemonsName.get(input[i].trim()));
  }
}

console.log(result.join("\n"));
