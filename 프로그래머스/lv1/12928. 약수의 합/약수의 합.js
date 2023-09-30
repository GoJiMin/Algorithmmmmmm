const solution = n => Array(n).fill().map((v, i) => i + 1).reduce((acc, cur) => {
  if(n % cur === 0) {
      return acc + cur
  } 

    return acc
}, 0)