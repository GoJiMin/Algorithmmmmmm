const solution = (sides) => sides.sort((a, b) => a - b).reduce((acc, cur, i, arr) => {
    if(i === arr.length - 1) {
        acc > cur ? acc = 1 : acc = 2
    } else {
        acc += cur
    }
    return acc
})
