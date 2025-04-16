const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

let state = 0;
let N = 0,
  M = 0;
let arrA = [];
let readCount = 0;
let answer = 0;
const output = [];

rl.on('line', line => {
  if (state === 0) {
    [N, M] = line.split(' ').map(Number);
    if (N === 0 && M === 0) {
      rl.close();
    } else {
      arrA = [];
      readCount = 0;
      answer = 0;
      state = 1;
    }
  } else if (state === 1) {
    arrA.push(Number(line));
    readCount++;
    if (readCount === N) {
      arrA.sort((a, b) => a - b);
      readCount = 0;
      state = 2;
    }
  } else if (state === 2) {
    const b = Number(line);
    let lo = 0,
      hi = N - 1;
    while (lo <= hi) {
      const mid = (lo + hi) >>> 1;
      if (arrA[mid] === b) {
        answer++;
        break;
      } else if (arrA[mid] < b) lo = mid + 1;
      else hi = mid - 1;
    }
    readCount++;
    if (readCount === M) {
      // 이 케이스 끝
      output.push(answer);
      state = 0;
    }
  }
});

rl.on('close', () => {
  console.log(output.join('\n'));
  process.exit(0);
});
