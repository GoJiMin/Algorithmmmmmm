const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "script.txt")
  .toString()
  .trim()
  .split("\n")
  .map(Number);

const [n, ...arr] = input;

const stack = [];
let ans = 0;

for (let i = 0; i < n; i++) {
  const now = {
    height: arr[i],
    count: 1,
  };

  while (stack.at(-1) && stack.at(-1).height <= arr[i]) {
    ans += stack.at(-1).count;
    if (stack.at(-1).height === arr[i]) {
      now.count += stack.at(-1).count;
    }
    stack.pop();
  }

  if (stack.at(-1)) {
    ans++;
  }

  stack.push(now);
}

console.log(ans);
