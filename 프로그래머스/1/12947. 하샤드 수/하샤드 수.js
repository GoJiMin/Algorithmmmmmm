const solution = x => {
    let sum = 0;
    let num = x;
    
    do {
        sum += x % 10
        x = ~~(x/10)
    } while(x > 0)
        
    return !(num%sum)
}