const solution = (a, b) => {
    const num1 = ~~((a + '') + (b + ''))
    const num2 = 2 * a * b
    
    return num1 > num2 ? num1 : num2
}