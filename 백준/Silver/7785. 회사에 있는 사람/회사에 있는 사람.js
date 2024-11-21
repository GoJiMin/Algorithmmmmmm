const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const [n, ...beforeTrim] = input;

const arr = beforeTrim.map((el) => el.trim().split(" "));

const logs = new Map();

for (let i = 0; i < +n; i++) {
  const [name, action] = arr[i];

  if (action === "enter") {
    if (logs.has(name)) continue;

    logs.set(name);
  }

  if (action === "leave") {
    if (!logs.has(name)) continue;

    logs.delete(name);
  }
}

const result = [];

for (const name of logs.keys()) result.push(name);

// 하.. 여기다 join 쓰고 있는걸 3번 틀리고서야 확인했네
result.sort((a, b) => (a < b ? 1 : -1));

console.log(result.join("\n"));
