const solution = arr => arr.reduce((acc, cur) => {
    if(cur < 50 && cur % 2 === 1) {
        acc.push(cur * 2)
    } else if(cur >= 50 && cur % 2 === 0) {
        acc.push(cur / 2)
    } else {
        acc.push(cur)
    }
    
    return acc
}, [])