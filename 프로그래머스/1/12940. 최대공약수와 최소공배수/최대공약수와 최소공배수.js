const solution = (n, m) => {
    const multiply = n * m;
    const result_gcd = gcd(n, m);
    const result_lcm = lcm(multiply, result_gcd)
    
    return [result_gcd, result_lcm]
}

const gcd = (num1, num2) => num2 === 0 ? num1 : gcd(num2, num1 % num2)


const lcm = (multiply, gcd) => multiply / gcd