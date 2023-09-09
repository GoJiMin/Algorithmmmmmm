const solution = (str) => [...str].reduce((acc, cur) => {
    if(!isNaN(cur)) {
        acc += Number(cur)
    }
    return acc
}, 0)