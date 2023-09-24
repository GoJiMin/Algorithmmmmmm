const solution = dots => {
    dots.sort((a, b) => a[0] - b[0])
    
    const side1 = Math.abs(dots[0][1] - dots[1][1])
    const side2 = Math.abs(dots[0][0] - dots[2][0])
    
    return side1 * side2
}