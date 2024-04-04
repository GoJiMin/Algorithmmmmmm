const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "script.txt")
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.split(" ").map(Number));

const [n, arr] = input;

const tower = [{ idx: 0, height: 100000001 }];
const answer = [];

for (let i = 0; i < n; i++) {
  const current = {
    idx: i + 1,
    height: arr[i],
  };

  while (tower.at(-1).height < current.height) {
    tower.pop();
  }

  answer.push(tower.at(-1).idx);
  tower.push(current);
}

console.log(answer.join(" "));
