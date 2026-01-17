const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

/**
 * 흠 일단 주어진 입력은 키와 이미 암호화된 암호문이 들어오는데요..
 *
 * 이 문제에서 평문을 암호화하는 알고리즘은
 * 1. 평문을 키의 길이만큼 자른다.
 * 2. 키의 각 자리를 사전순으로 정렬한다.
 * 3. 정렬된 키의 행을 조립한다.
 * 입니다..
 *
 * 그럼 이걸 다시 원복 시키는 방법은..?
 * 1. 주어진 암호문을 (암호문 길이 / 키 길이)만큼 자른다.
 * 2. 키를 정렬한 상태에서 정렬 전 키의 인덱스와 매핑한다.
 * 3. 매핑한 인덱스로 키를 다시 평문으로 복구한다?
 *
 * 일단 코드로 좀 짜봅시다.
 */

const key = input[0].trim();
const t = input[1].trim();
const n = t.length / key.length;

const ciphertext = [];
for (let i = 0; i + n <= t.length; i += n) {
  ciphertext.push(t.slice(i, i + n));
}

// BATBOY 처럼 중복 문자 나오는 거 대비..
const keyMap = key.split('').map((char, index) => {
  return {char: char, index: index};
});

keyMap.sort((a, b) => {
  if (a.char < b.char) return -1;
  if (a.char > b.char) return 1;
  return a.index - b.index;
});

const plaintext = Array(key.length);
for (let i = 0; i < key.length; i++) {
  const origin = keyMap[i].index;

  plaintext[origin] = ciphertext[i];
}

const result = [];
for (let i = 0; i < n; i++) {
  for (let j = 0; j < key.length; j++) {
    result.push(plaintext[j][i]);
  }
}

console.log(result.join(''));
