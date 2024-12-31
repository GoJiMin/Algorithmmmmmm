const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const N = Number(input[0]);

const garbs = [];

for (let i = 1; i <= N; i++) {
  garbs.push(input[i].trim());
}

const costMap = new Map();

const costName = ["P", "C", "V", "S", "G", "F"];

input[N + 1]
  .split(" ")
  .forEach((cost, i) => costMap.set(costName[i], Number(cost)));
costMap.set("O", Number(input[N + 2]));

let cost = 0;

for (let i = 0; i < N; i++) {
  let isMixed = false;

  for (let idx = 0; idx < garbs[i].length; idx++) {
    if (idx === 0) continue;

    if (garbs[i][idx] !== garbs[i][idx - 1]) {
      isMixed = true;
      break;
    }
  }

  if (isMixed) {
    cost += garbs[i].length * costMap.get("O");
  } else if (costMap.get("O") < costMap.get(garbs[i][0])) {
    cost += garbs[i].length * costMap.get("O");
  } else {
    cost += garbs[i].length * costMap.get(garbs[i][0]);
  }
}

console.log(cost);
