const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

let idx = 0;
const [n, m] = input[idx++].split(" ").map(Number);

const result = Array.from({ length: n }, () => Array(m));

const [u, v] = input[idx++].split(" ").map(Number);

const texture = [];
for (let i = 0; i < u; i++) texture.push(input[idx++].trim().split(""));

const command = input[idx];

if (command === "clamp-to-edge") {
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      const t_i = i >= u ? u - 1 : i;
      const t_j = j >= v ? v - 1 : j;

      result[i][j] = texture[t_i][t_j];
    }
  }
} else if (command === "repeat") {
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      result[i][j] = texture[i % u][j % v];
    }
  }
} else {
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      const section_row = Math.floor(i / u);
      const section_col = Math.floor(j / v);

      let inner_row = i % u;
      let inner_col = j % v;

      if (section_row % 2 === 1) inner_row = u - 1 - inner_row; // 상하 반전
      if (section_col % 2 === 1) inner_col = v - 1 - inner_col; // 좌우 반전

      result[i][j] = texture[inner_row][inner_col];
    }
  }
}

for (let i = 0; i < n; i++) console.log(result[i].join(""));
