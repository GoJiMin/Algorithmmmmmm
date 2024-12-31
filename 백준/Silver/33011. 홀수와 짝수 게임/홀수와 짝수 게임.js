const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

/**
 * 카드의 홀 / 짝 개수로 보면,
 * 4
 * 1 2 3 4의 경우는 O = 2, E = 2
 *
 * 그럼 카드의 숫자만 놓고 보면 채완이가 먼저 시작함. 그럼 1, 3, 5, ... 순으로 카드를 뽑겠지?
 * 그럼 채완이의 순서가 3이 되는 순간에 O는 이미 음수라 패배.
 *
 * 조금만 생각해보면 홀수 카드인 O의 개수가 홀수개일 때, 홀수 카드를 채완이가 먼저 집으면 희원이가 이김.
 * O = 3 => 채완이가 3번째에 마지막으로 뽑으면 희원이는 홀수 카드가 없어서 패배.
 *
 * 물론 둘 다 홀수를 집었을 때.. 그럼 마찬가지로 둘 다 짝수 집는데 E가 홀수면 채완이가 이기고 희원이가 패배.
 *
 * 같은 홀을 골랐을 때 O가 홀수면 채완 승
 * 같은 홀을 골랐을 때 O가 짝수면 희원 승
 * 같은 짝을 골랐을 때 E가 홀수면 채완 승
 * 같은 짝을 골랐을 때 E가 짝수면 희원 승
 *
 * 그럼 둘이 반대로 집으면..? 두 놈 모두 최선을 다한다니까 채완이가 처음에 먼저 집을 카드는 max(O, E)?
 * 채완이놈이 홀수 카드를 집고 희원이놈이 짝수 카드를 집으면
 * 서로 번갈아가면서 O와 E에서 번갈아 1씩 빼다 먼저 음수 나오면 짐.
 *
 * 채완이놈이 O, 희원이놈이 E면
 * O가 더 크면 당연히 희원이놈이 못 뽑고 채완이놈이 승
 * E가 더 크면 당연히 채완이놈이 못 뽑고 희원이놈이 승
 * 둘이 같으면 채완이놈이 먼저 뽑으니까 희원이놈이 승\
 *
 * O > E면 채완 승
 * O <= E면 희원 승
 *
 *
 * 아 짜증나... 그럼 두 놈 다 최선을 다한다니까
 *
 * 채완 - 홀, 희원 - 홀
 * O % 2 === 1 ? 채완이놈 승 : 희원이놈 승
 *
 * 채완 - 짝, 희원 - 짝
 * E % 2 === 1 ? 채완이놈 승 : 희원이놈 승
 *
 * 채완 - 홀, 희원 - 짝
 * O > E ? 채완이놈 승 : 희원이놈 승
 *
 * 채완 - 짝, 희원 - 홀
 * E > O ? 채완이놈 승 : 희원이놈 승
 *
 * 그럼 두 놈이 서로 (홀, 짝), (홀, 홀), (짝, 홀), (짝, 짝) 고른 경우를 돌려?
 */

const T = Number(input[0]);
const P1 = "amsminn";
const P2 = "heeda0528";

function getWinner(p1, p2, O, E) {
  if (p1 === "odd" && p2 === "odd") {
    return O % 2 === 1 ? P1 : P2;
  }

  if (p1 === "even" && p2 === "even") {
    return E % 2 === 1 ? P1 : P2;
  }

  if (p1 === "odd" && p2 === "even") {
    return O > E ? P1 : P2;
  }

  if (p1 === "even" && p2 === "odd") {
    return E > O ? P1 : P2;
  }
}

function simulate(p1, O, E) {
  const possibleP2 = ["odd", "even"];

  for (const p2 of possibleP2) {
    const w = getWinner(p1, p2, O, E);

    if (w === P2) return P2;
  }

  return P1;
}

const ans = [];

for (let i = 0; i < T; i++) {
  const cards = input[2 + i * 2].split(" ").map(Number);

  let O = 0;
  let E = 0;

  cards.forEach((card) => (card % 2 === 1 ? O++ : E++));

  const p1Candidates = ["odd", "even"];
  let canP1Win = false;
  for (const p1 of p1Candidates) {
    const result = simulate(p1, O, E);

    if (result === P1) {
      canP1Win = true;
      break;
    }
  }

  if (canP1Win) {
    ans.push(P1);
  } else {
    ans.push(P2);
  }
}

console.log(ans.join("\n"));
