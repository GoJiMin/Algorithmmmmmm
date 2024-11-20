const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim();

const target = Number(input);

let ans = Number.MAX_SAFE_INTEGER;

for (let i = 1; i <= 1000000; i++) {
  const converted = i.toString();

  let current = i;

  for (let j = 0; j < converted.length; j++) current += parseInt(converted[j]);

  if (current === target && ans >= current) ans = i;
}

console.log(ans === Number.MAX_SAFE_INTEGER ? 0 : ans);
