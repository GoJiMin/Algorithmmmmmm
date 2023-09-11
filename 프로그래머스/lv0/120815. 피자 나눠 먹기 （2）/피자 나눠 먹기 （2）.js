const solution = (n, s = 6) => {
    const gcd = (n, s) => n % s === 0 ? s : gcd(s, n % s);
    
    
    return n / gcd(n, s)
}