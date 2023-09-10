const solution = (box, n) => box.reduce((acc, cur) => {
    acc.push(~~(cur / n))
    return acc
}, []).reduce((acc, cur) => acc * cur)