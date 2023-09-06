const solution =  (arr) => {
    let even = 0;
    let odd = 0;
    arr.forEach(n => n % 2 === 0 ? even++ : odd++)
    
    return [even, odd]
}