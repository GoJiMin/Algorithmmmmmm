const solution = n => {
    let x = 1;
    
    while(n % x !== 1) {
        n % x;
        x++
    }
    
    return x;
}