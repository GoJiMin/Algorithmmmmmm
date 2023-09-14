const solution = array => array.map(v => (v + '').split(''))
.reduce((acc, cur) => {
    acc.push(...cur)
    return acc
}, []).filter(el => +el === 7).length