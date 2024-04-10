const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "script.txt")
  .toString()
  .trim();

const alp = Array(26).fill(-1);

for (let i = 0; i < input.length; i++) {
  const idx = input[i].charCodeAt() - 97;
  if (alp[idx] === -1) {
    alp[idx] = i;
  }
}

console.log(alp.join(" "));
