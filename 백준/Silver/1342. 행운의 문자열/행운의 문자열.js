const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim();

/**
 * 그냥 주어진 단어 배열로 분리해서 각 인덱스별로 만들 수 있는 모든 단어 다 조합해버리면 되는 거 아닌지?
 *
 * 백트래킹?
 */

const word = input.trim().split('');
const isUsed = Array(word.length).fill(false);

let count = 0;
const arr = [];

const luckyWordMap = new Map();

function bt(k) {
  if (k === word.length) {
    const currentWord = arr.join('');
    if (!luckyWordMap.has(currentWord)) {
      count++;
      luckyWordMap.set(currentWord);
    }
    return;
  }

  for (let i = 0; i < word.length; i++) {
    if (isUsed[i]) continue;
    // 이전 문자가 이번에 탐색하는 문자와 같으면 넘기기?
    if (arr[k - 1] === word[i]) continue;

    isUsed[i] = true;
    arr[k] = word[i];
    bt(k + 1);
    isUsed[i] = false;
  }
}

bt(0);
console.log(count);
