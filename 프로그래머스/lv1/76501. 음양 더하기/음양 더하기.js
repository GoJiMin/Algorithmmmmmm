const solution = (abs, signs) => abs.map((n, idx) => signs[idx] === true ? n : -n).reduce((acc, cur) => acc + cur)

