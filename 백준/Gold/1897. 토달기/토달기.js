const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

/**
 * 감이 안 잡혀서 한 20분 정도 가만히 생각을 하고 있었는데요..
 *
 * 힌트에 cal => coal => coral => choral로 가더라구요.. 중간이라고 했는데,
 * 중간의 의미가 그냥 c - l 사이의 모든 인덱스였나봅니다.. o나 r만 중간인 줄 알았습니다..
 *
 * 그럼 어쨌든 입력으로 주어진 단어 외에는 사용을 못한다는 건데, 그럼 접근을
 * 글자 수를 기준으로 오름차순 정렬한 뒤에 각 단어에서 한 글자씩 뺀 단어가 현재 주어진 단어 배열에 있는지
 * 확인하면서 가장 긴 단어를 업데이트해주면 될 거 같은데요..
 *
 * 근데 아무래도 주어진 단어가 1000개까지 주어지니 배열에서 직접 순회하는 것보단 해시를 사용해봅시다.
 */

const [d, startWord] = input[0].split(' ');

const dictionary = [];
for (let i = 1; i <= Number(d); i++) dictionary.push(input[i].trim());

dictionary.sort((a, b) => a.length - b.length);

// 만들 수 있는지?
const wordMap = new Map();
wordMap.set(startWord);

// 일단 처음 들어온 문자로 초기화
let maxWord = startWord;

for (const word of dictionary) {
  if (word.length <= startWord.length) continue;

  for (let i = 0; i < word.length; i++) {
    // slice는 st, en이 인자로 들어가면 i 전까지 잘라줌.. 0, 2면 0,1에 해당하는 문자열..
    // en 안 주면 끝까지.. 그럼 이렇게 자르면 i번째 문자 빼고 싹 잘라주겠네요..
    const prev = word.slice(0, i) + word.slice(i + 1);

    // 한 글자 빼봤는데 만들 수 있으면..
    if (wordMap.has(prev)) {
      wordMap.set(word);

      if (maxWord.length < word.length) {
        maxWord = word;
      }
      break;
    }
  }
}

console.log(maxWord);
