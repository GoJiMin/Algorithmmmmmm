const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

/**
 * A는 A끼리, B는 B끼리 아치형 곡선으로 이었을 때 짝이 지어지면 좋은 단어..
 * 주의할 점은 선끼리 교차하면 안됨..
 *
 * 일단 아치형 곡선이 교차되는 경우가 무엇일까?
 *
 * AA => 곡선을 그렸을 때 곡선이 하나만 그려지고 짝이 지어지니 좋은 단어임.
 * AABB => 곡선을 그렸을 때 두 곡선이 그려지지만 교차되지 않고 짝이 지어지니 좋은 단어임.
 * ABAB => 곡선을 그렸을 때 두 곡선이 그려지며 짝이 지어지지만 곡선이 교차해 좋은 단어가 아님.
 *
 * 현재 단어가 cur이라고 할 때,
 * rear === cur => 그냥 pop
 * rear !== cur => 이 경우 rear === cur + 1이라면 무조건 좋은 단어가 아님.
 * why? ABAB => 교차, ABAA => 이미 짝이 지어지지 않음
 * 다시 생각해보니 아닌 거 같음. ABAABA => 곡선이 교차되지 않음..
 *
 * 다시 생각해보자
 *
 * 우선 좋은 단어가 아닐 경우가 무엇일까?
 * 1. 단어가 짝이지어지지 않은 경우. => 모든 반복문 종료 후 스택이 비어있지 않을 경우.
 * 2. 짝이 지어졌으나 곡선이 교차한 경우.
 *
 * 그럼 곡선이 교차하는 경우는 언제 발생할까?
 * => ABAB 제외 없음.
 *
 * 근데 다시 생각해보니 그냥 무조건 rear랑 cur이 같을 때를 제외하고는 모두 교차하는 거 아닌가?
 *
 * ABAB일 때,
 * 1. [A]
 * 2. A !== B => [A, B]
 * 3. B !== A => [A, B, A]
 * 4. A !== B => [A, B, A, B]
 * 5. stack.len !== 0 then 실패
 *
 * ABBABB일 때,
 * 1. [A]
 * 2. A !== B => [A, B]
 * 3. B === B => [A]
 * 4. A === A => []
 * 5. [B]
 * 6. B === B => []
 * 7. stack.len === 0 then 성공
 *
 * 너무 복잡하게 생각해서 오히려 손해본듯..
 */

let idx = 0;

const N = Number(input[idx++]);

let cnt = 0;
for (let i = 0; i < N; i++) {
  const line = input[idx++].trim();

  // 일단 첫 번째 단어는 무조건 스택에 들어가있어도 괜찮을듯..
  const stack = [line[0]];

  // 2번째 단어부터 시작..
  for (let j = 1; j < line.length; j++) {
    const s = line[j];

    // 같은 단어라면
    if (stack.at(-1) === s) stack.pop();
    else stack.push(s);
  }

  if (!stack.length) cnt++;
}

console.log(cnt);
