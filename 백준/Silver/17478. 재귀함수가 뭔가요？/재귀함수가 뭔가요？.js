const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim();

const n = Number(input);
const indent = "____";
const P1 = `"재귀함수가 뭔가요?"`;
const P2 = `"잘 들어보게. 옛날옛날 한 산 꼭대기에 이세상 모든 지식을 통달한 선인이 있었어.`;
const P3 = `마을 사람들은 모두 그 선인에게 수많은 질문을 했고, 모두 지혜롭게 대답해 주었지.`;
const P4 = `그의 답은 대부분 옳았다고 하네. 그런데 어느 날, 그 선인에게 한 선비가 찾아와서 물었어."`;
const LAST_P = `라고 답변하였지.`;

let answer =
  `어느 한 컴퓨터공학과 학생이 유명한 교수님을 찾아가 물었다.` + "\n";

function rec(cnt) {
  //base case
  if (cnt === n) {
    answer += indent.repeat(cnt) + P1 + "\n";
    answer +=
      indent.repeat(cnt) + `"재귀함수는 자기 자신을 호출하는 함수라네"` + "\n";
    answer += indent.repeat(cnt) + LAST_P + "\n";

    return;
  }

  answer += indent.repeat(cnt) + P1 + "\n";
  answer += indent.repeat(cnt) + P2 + "\n";
  answer += indent.repeat(cnt) + P3 + "\n";
  answer += indent.repeat(cnt) + P4 + "\n";

  rec(cnt + 1);

  answer += indent.repeat(cnt) + LAST_P + "\n";
}

rec(0);

console.log(answer);
