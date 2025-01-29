const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim();

/**
 * G 킬로그램이 무엇이냐.. 성원이의 현재 몸무게의 제곱에서 성원이가 기억하던 몸무게의 제곱을 뺀 것..
 * curWeight(성원이의 현재 무게) = 7, prevWeight(성원이가 기억하던 무게) = 6이면..
 * 49 - 36 => 13이라는 거죠..?
 *
 * G 킬로그램이 15일 때, 가능한 현재 몸무게가 4가 나온다..?
 *
 * 그럼 음.. 일단 단순히 G 킬로그램이 몇인지만 알려주고 있는데요,
 * 그럼 1부터 시작해서 임의로 현재 몸무게와 기억하고 있는 몸무게를 설정하고,
 * 제곱해 뺀 값이 G 값으로 나오는 경우에 result 배열에 넣어줄까요?
 *
 * 그럼 left, right으로 포인터를 두고 left를 성원이가 기억하는 몸무게,
 * right를 현재 몸무게로 둘까요?
 *
 * 그럼 left가 right을 교차하는 순간 while문을 벗어나게 작성하면 될 거 같고...
 *
 * left가 1, right가 3일 때, G 킬로그램이 만약 15라면,
 * 9 - 1 = 8로 G 킬로그램보다 확실히 작으니 right 포인터를 오른쪽으로 움직인다..로 이해하고 풀어볼까요?
 */

const g_kg = Number(input);

const result = [];

let prevWeight = 1;
let curWeight = 2;

while (prevWeight < curWeight) {
  const diff = Math.pow(curWeight, 2) - Math.pow(prevWeight, 2);

  if (diff === g_kg) {
    result.push(curWeight);
    prevWeight++;
  } else if (diff < g_kg) {
    curWeight++;
  } else {
    prevWeight++;
  }
}

if (result.length === 0) {
  console.log(-1);
} else {
  console.log(result.join("\n"));
}
