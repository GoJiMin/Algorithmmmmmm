const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

let idx = 0;
const [a, b, c, d] = input[idx++].split(' ').map(Number);

const arrA = [];
for (let i = 0; i < a; i++) arrA.push(Number(input[idx++]));

const arrB = [];
for (let i = 0; i < b; i++) arrB.push(Number(input[idx++]));

const arrC = [];
for (let i = 0; i < c; i++) arrC.push(Number(input[idx++]));

const arrD = [];
for (let i = 0; i < d; i++) arrD.push(Number(input[idx++]));

const sumAB = new Map();
for (const x of arrA) {
  for (const y of arrB) {
    const s = x + y;
    if (!sumAB.has(s)) {
      sumAB.set(s, [x, y]);
    }
  }
}

for (const z of arrC) {
  for (const w of arrD) {
    const need = -(z + w);
    if (sumAB.has(need)) {
      const [x, y] = sumAB.get(need);
      console.log(`${x} ${y} ${z} ${w}`);
      process.exit(0);
    }
  }
}
