const solution = s => s.length === 1 ? +s : s.split(' ').reduce((acc, cur, i, arr) => {
    if(cur === 'Z') {
        return +acc - +arr[i - 1]
    } else {
        return +acc + +cur
    }
    
    return acc
}, 0)