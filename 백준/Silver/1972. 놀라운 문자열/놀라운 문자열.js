const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

const result = [];
for (let i = 0; i < input.length - 1; i++) {
  const curStr = input[i].trim();
  const len = curStr.length;

  let surprising = true;
  for (let D = 0; D <= len - 2 && surprising; D++) {
    const set = new Set();

    for (let j = 0; j + D + 1 < len; j++) {
      const pair = curStr[j] + curStr[j + D + 1];

      if (set.has(pair)) {
        surprising = false;
        break;
      }

      set.add(pair);
    }
  }

  if (surprising) {
    result.push(`${curStr} is surprising.`);
  } else {
    result.push(`${curStr} is NOT surprising.`);
  }
}

console.log(result.join('\n'));
