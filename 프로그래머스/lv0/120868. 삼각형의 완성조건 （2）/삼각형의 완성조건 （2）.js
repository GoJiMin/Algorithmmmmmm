const solution = (sides) => {
    const max = Math.max(...sides)
    const min = Math.min(...sides)
    
    const sum = max + min
    
    return Array(sum).fill().map((v, i) => i).reduce((acc, cur) => {
        if(min + cur > max || sum < cur) {
            acc.push(cur)
        }
        
        return acc
    }, []).length
}