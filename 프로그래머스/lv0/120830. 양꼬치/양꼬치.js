const solution = (n, k) => {
    let sale = n / 10;
    
    return n * 12000 + (k - ~~sale) * 2000
}