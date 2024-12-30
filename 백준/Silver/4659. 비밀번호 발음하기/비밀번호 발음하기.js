const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

let idx = 0;

const vowels = new Set(["a", "e", "i", "o", "u"]);
const exception = new Set(["e", "o"]);

while (input[idx].trim() !== "end") {
  const password = input[idx++].trim();

  let hasVowel = false;
  let vowelStreak = 0;
  let consonantStreak = 0;

  let isAcceptable = true;

  for (let i = 0; i < password.length; i++) {
    if (vowels.has(password[i])) {
      hasVowel = true;
      vowelStreak++;

      consonantStreak = 0;
    } else {
      consonantStreak++;

      vowelStreak = 0;
    }

    if (vowelStreak === 3 || consonantStreak === 3) {
      isAcceptable = false;
      break;
    }

    if (password[i - 1] === password[i] && !exception.has(password[i])) {
      isAcceptable = false;
      break;
    }
  }

  if (!hasVowel) isAcceptable = false;

  console.log(
    `<${password}> is ${isAcceptable ? "acceptable" : "not acceptable"}.`
  );
}
