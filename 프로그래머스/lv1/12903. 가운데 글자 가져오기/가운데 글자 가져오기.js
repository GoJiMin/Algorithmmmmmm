const solution = s => {
    const strLength = s.length 
    const midNum = strLength % 2 === 0 ? strLength / 2 - 1 : ~~(strLength / 2)
    
    const result = strLength % 2 === 0 ? s.slice(midNum, midNum + 2) : s.slice(midNum, midNum + 1)
    
    return result
}