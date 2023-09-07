const solution = (arr) => arr.reduceRight((acc, cur) => {
    acc.push(cur)
    return acc
}, [])