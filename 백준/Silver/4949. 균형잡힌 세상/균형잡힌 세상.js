const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

// 오랜만에 PS... 감 좀 잡아야할 거 같으니 쉬운 문제부터..

/**
 * 올바른 괄호 쌍 문제.. 닫는 괄호는 가장 마지막에 들어온 괄호를 지우는 명령이라고 생각해봅시다..
 *
 * (, [ => 그대로 스택에 push..
 * ), ] => 스택이 비어있는지?, rear가 대칭이 맞는 괄호인지 판단..
 *
 * 연산 다 끝나고 스택 비어있는지 확인하면 될듯? 오랜만이라 가물가물..
 */

function validate(str) {
  const stack = [];

  for (let i = 0; i < str.length - 1; i++) {
    const s = str[i];
    // 여는 괄호면 일단 스택에 넣어놓기..
    if (s === '(' || s === '[') stack.push(s);

    // 스택이 비어있지 않으면서 rear가 동일한 괄호일 경우 pop..
    switch (s) {
      case ')':
        if (stack.length && stack.at(-1) === '(') stack.pop();
        else return false;
        break;
      case ']':
        if (stack.length && stack.at(-1) === '[') stack.pop();
        else return false;
        break;
    }
  }
  // 끝났을 때 스택이 비어있지 않다면 올바르지 않은..
  if (stack.length) return false;
  else return true;
}
const result = [];

for (let i = 0; i < input.length - 1; i++) {
  const line = input[i].trim();

  if (validate(line)) result.push('yes');
  else result.push('no');
}

console.log(result.join('\n'));
