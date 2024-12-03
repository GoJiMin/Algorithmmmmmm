const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const n = Number(input[0]);
const players = [];

for (let i = 1; i <= n; i++) {
  players.push(input[i].split(" ").map(Number));
}

function caculateDiff(startTeam) {
  const linkTeam = [];

  for (let i = 0; i < n; i++) {
    if (!startTeam.has(i)) linkTeam.push(i);
  }

  const calculateTeamAbility = (team) => {
    let sum = 0;

    for (let i = 0; i < team.length; i++) {
      for (let j = 0; j < team.length; j++) {
        if (i === j) continue;

        sum += players[team[i]][team[j]];
      }
    }

    return sum;
  };

  const startAbility = calculateTeamAbility([...startTeam]);
  const linkAbility = calculateTeamAbility(linkTeam);

  return Math.abs(startAbility - linkAbility);
}

let minDiff = Number.MAX_SAFE_INTEGER;

function bt(k, idx, startTeam) {
  if (k === n / 2) {
    const diff = caculateDiff(startTeam);

    minDiff = Math.min(minDiff, diff);
    return;
  }

  for (let i = idx; i < n; i++) {
    startTeam.add(i);
    bt(k + 1, i + 1, startTeam);
    startTeam.delete(i);
  }
}

bt(0, 0, new Set());
console.log(minDiff);
