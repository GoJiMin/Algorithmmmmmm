const solution = (d, budget) => {
    let index = 0;
    
    d.sort((a, b) => a - b).reduce((acc, cur) => {
        if(acc + cur <= budget) {
            index++
        }
        return acc + cur
    }, 0)
    
    return index
}