const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

// sort 함수 써야지..

/*
  1. sort 함수는 그냥 돌리기만 하면 문자열에 대해 사전순으로 정렬
  2. 그럼 (a, b) 인자를 받으면..? [1, 2] 배열을 정렬할 때 a는 2임.
     - 반환 값이 음수이면 a가 b보다 앞에 있게 됨. 위의 예시에선 양수니까 안 감.
     - 반환 값이 0이면, 즉 같다면 stable sort 성질로 그냥 둠.
     - 반환 값이 양수이면 b가 a보다 앞에 있게 됨. 위의 예시에서 양수니까 [1, 2]로 정렬됨.

  3. 그럼 구현은...
     - 우선 문자의 길이가 우선시 되어야하니 기본적인 return은 a.length - b.length..
     - 둘의 길이가 같을 때 if 문을 사용해 각 자릿수를 더한 값을 빼서 return..
     - 근데 둘의 자릿수를 더한 값이 같으면 사전순으로 비교..
*/

const [n, ...arr] = input;

const serial = arr.map((el) => el.trim().split(""));

serial.sort((a, b) => {
  if (a.length === b.length) {
    let aSum = 0;
    let bSum = 0;

    for (let i = 0; i < a.length; i++) {
      if (!isNaN(a[i])) aSum += Number(a[i]);
    }

    for (let i = 0; i < b.length; i++) {
      if (!isNaN(b[i])) bSum += Number(b[i]);
    }

    if (aSum === bSum) {
      return a.join("").localeCompare(b.join(""));
    }

    return aSum - bSum;
  }

  return a.length - b.length;
});

let result = "";

for (let i = 0; i < n; i++) {
  result += serial[i].join("") + "\n";
}

console.log(result);
