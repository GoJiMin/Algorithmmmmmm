const solution = n => Array(n).fill(1).map((v, i) => v + i).reduce((acc, cur) => {
    if(n % cur === 0) {
        return acc += cur
    }
    
    return acc
}, 0)