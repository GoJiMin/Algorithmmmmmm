const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "script.txt")
  .toString()
  .trim();

const arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let max = 0;

[...input].forEach((num) => {
  arr[num]++;
});

for (let i = 0; i < arr.length; i++) {
  if (i === 6 || i === 9) {
    continue;
  }

  max = Math.max(max, arr[i]);
}

max = Math.max(max, Math.ceil((arr[6] + arr[9]) / 2));
console.log(max);