const solution = (x) => {
    const divide = (x + '').split('').reduce((acc, cur) => +acc + +cur)
    
    return x % divide === 0 ? true : false
}