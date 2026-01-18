const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

/**
 * 한 놈을 골라서 저장해놓아야 할 거 같습니다..
 *
 * like 반장 선거..?
 *
 * picture는 문제에서 말하는 방법으로 돌리면 icturep, cturepi, turepic, ... 이렇게 나오는데요..
 * 여기서 사전 순으로 젤 빠른 놈을 골라다가 Set에 넣어놓읍시다.. 중복제거..
 *
 * 그럼 결국 picture를 돌리다가 사전 순으로 가장 빠른 c~~가 저장되고,
 * 다음으로 turepic도 같은 단어라면 돌리다가 사전 순으로 가장 빠른 c~~가 저장되니
 *
 * 중복 자료를 없앤 set 자료형엔 서로 다른 단어만 남겠네요..
 */

const n = Number(input[0]);
const uniqueWords = new Set();

for (let i = 1; i <= n; i++) {
  const originalWord = input[i].trim();
  const wordArr = [...originalWord];

  let minWord = originalWord;

  for (let j = 0; j < originalWord.length; j++) {
    const front = wordArr.shift();
    wordArr.push(front);

    const rotatedString = wordArr.join('');

    if (rotatedString < minWord) {
      minWord = rotatedString;
    }
  }

  uniqueWords.add(minWord);
}

console.log(uniqueWords.size);
