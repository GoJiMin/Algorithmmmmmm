const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

/**
 * 문제에서 요구하는 것이 무엇일까요?
 *
 * 질문이 주어집니다. 각 질문은 lidx와 ridx 사이에서 타겟 알파벳이 몇 번 등장했는지를 요구합니다.
 *
 * 그럼 테이블의 각 인덱스는 문자열의 각 인덱스에서 알파벳이 몇 번 등장했는지를 기록해두면 되겠습니다..
 *
 * 예를 들어, abbde 문자열의 경우에서 table[3]인 경우, a는 1번, b는 2번 등장했음을 알 수 있도록 기록해둡시다..
 *
 * ex) table[a][3] = 1, table[b][3] = 2 => 그럼 table[알파벳][i] 는 i번째에 각 알파벳의 등장 횟수겠습니다..
 */

const str = input[0].trim();

const table = Array.from({ length: 26 }, () => Array(str.length).fill(0));

table[str[0].charCodeAt() - 97][0]++;

// 등장 횟수를 각 문자열의 인덱스별로 누적
for (let i = 1; i < str.length; i++) {
  const cur = str[i].charCodeAt() - 97;

  for (let j = 0; j < 26; j++) {
    // 우선 이전 인덱스 값을 모두 가져옴.
    table[j][i] = table[j][i - 1];
  }

  // 현재 등장한 문자열은 1을 더해줌.
  table[cur][i]++;
}

/**
 * 위와 같이 누적했을 때, 예제 seungjaehwang의 알파벳 a 테이블은 어떻게 구성될까요?
 * [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2] 이렇게 문자열의 각 인덱스별로 등장 횟수가 누적됩니다.
 *
 * 그럼 0번 인덱스부터 6번 인덱스까지 a는 몇 번 등장했을까요?
 * table[a][6] = 1로 1번 등장했음을 알 수 있습니다..
 *
 * 그럼 7번 인덱스부터 10번 인덱스는요?
 * table[a][10]일까요? 그럼 2인데 사실 a는 한 번 등장헀습니다.
 *
 * 7번부터 10번 인덱스의 값을 알기 위해선 7번까지 등장한 횟수를 10번까지 등장한 횟수에 빼줘야합니다..
 * table[a][10] - table[a][7 - 1] = 2 - 1 = 1
 * 7번까지 등장했던.. 그러니까 7번부터 세줘야하니까 7번 인덱스에 1을 빼줍니다..
 *
 * 그럼 구현해봅시다.
 */

const q = Number(input[1]);

const result = [];

for (let i = 2; i < 2 + q; i++) {
  const [target, lidx, ridx] = input[i].trim().split(" ");

  const charIdx = target.charCodeAt() - 97;
  const l = Number(lidx);
  const r = Number(ridx);

  // 만약 lidx가 0이면 빼줄 필요가 없기 때문.
  const leftVal = l > 0 ? table[charIdx][l - 1] : 0;

  result.push(table[charIdx][r] - leftVal);
}

console.log(result.join("\n"));
