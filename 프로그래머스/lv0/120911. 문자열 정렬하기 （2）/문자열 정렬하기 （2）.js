const solution = (str) => [...str].reduce((acc, cur) => {
    acc.push(cur.toLowerCase())
    return acc
}, []).sort().join('')