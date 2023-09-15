const solution = (balls, share) => {
    const factorial = (n) => {
        if(n === 1) {
            return n
        } else if(n === 0) {
            return 1
        }
        return n * factorial(n - 1)
    }

    return Math.round(factorial(balls) / (factorial(balls - share) * factorial(share)))
}