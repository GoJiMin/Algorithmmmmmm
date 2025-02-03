const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

/**
 * 조합론이 섞인 문제를 풀면 화가 나는 병에 걸렸습니다.
 *
 * 우선 빼놓지 않고 하나 들어가는 경우의 수는 아무것도 선택하지 않는다. => 1개
 * 그리고 예제의 경우로 "headgear"라는 종류가 총 2개 있죠?
 * { hat, turban } 그럼 무언가를 입을 수 있는 경우의 수는 어떻게 될까요?
 * hat을 착용한다 => 1
 * turban을 착용한다 => 2
 * 아무것도 입지 않는다 => 3
 * 그럼 3가지 선택지가 있어요.
 *
 * 그럼 다시 예제로 돌아와서 "eyewear"라는 종류가 하나 있었죠? { sunglasses }
 * 그럼 똑같아요. sunglasses를 착용한다 => 1
 * 아무것도 착용하지 않는다 => 2
 *
 * 그럼 이 2개를 조합하는 방법은요? 그냥 곱하는거죠?
 * hat sun
 * hat 착용 안 함.
 * tur sun
 * tur 착용 안 함.
 * 착용 안 함 sun
 * 착용 안 함 착용 안 함
 * 그러니까 3 * 2를 하고 아무것도 안 입는 경우를 1개만 빼주면 되겠죠?
 */

const t = Number(input[0]);

let idx = 1;

const result = [];

for (let i = 0; i < t; i++) {
  const n = Number(input[idx++]);

  const clothes = new Map();

  for (let i = 0; i < n; i++) {
    const [_, type] = input[idx++].trim().split(" ");

    clothes.set(type, (clothes.get(type) || 0) + 1);
  }

  let combinations = 1; // 곱해주려면 1로 시작해야겠죠..?

  for (const cnt of clothes.values()) {
    combinations *= cnt + 1; // 위에서 아무것도 착용하지 않는 경우 1개가 있었죠?
  }

  result.push(combinations - 1); // 알몸..인 ... 경우.. 제외..
}

console.log(result.join("\n"));
