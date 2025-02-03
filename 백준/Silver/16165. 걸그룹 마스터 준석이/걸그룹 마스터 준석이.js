const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const [n, m] = input[0].split(" ").map(Number);

const groups = new Map();

let idx = 1;

for (let i = 0; i < n; i++) {
  const groupName = input[idx++].trim();
  const memberCnt = Number(input[idx++]);
  const members = [];

  for (let i = 0; i < memberCnt; i++) {
    const member = input[idx++].trim();

    groups.set(member, groupName);
    members.push(member);
  }

  groups.set(groupName, members);
}

const result = [];
for (let i = 0; i < m; i++) {
  const name = input[idx++].trim();
  const type = input[idx++].trim();

  switch (type) {
    case "0":
      for (const member of groups.get(name).sort()) result.push(member);
      break;
    case "1":
      result.push(groups.get(name));
      break;
  }
}

console.log(result.join("\n"));
