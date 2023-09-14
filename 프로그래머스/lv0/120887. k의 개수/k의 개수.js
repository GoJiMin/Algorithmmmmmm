const solution = (i, j, k) => {
    const arr = Array(j - i + 1).fill().map((v, idx) => i + idx + '').map(v => v.split(''))
    
    return arr.reduce((acc, cur) => {
        acc.push(...cur)
        return acc
    }, []).filter(el => el === (k + '')).length
}