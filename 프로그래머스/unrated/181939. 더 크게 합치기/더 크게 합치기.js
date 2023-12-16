const solution = (a, b) => {
    const num1 = ~~((a + '') + (b + ''))
    const num2 = ~~((b + '') + (a + ''))
    
    return num1 > num2 ? num1 : num2
}