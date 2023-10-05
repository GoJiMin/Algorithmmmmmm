const solution = (numbers) => {
    const notIn = [0,1,2,3,4,5,6,7,8,9].filter(num => !numbers.includes(num))
    const result = notIn.reduce((acc, cur) => acc + cur)
    
    return result
    
}