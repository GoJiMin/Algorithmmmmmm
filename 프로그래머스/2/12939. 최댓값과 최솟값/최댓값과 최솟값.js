const solution = s => {
    const arr = s.split(' ').map(n => Number(n));
    const result = [Math.min(...arr), Math.max(...arr)];
    
    
    return result.join(' ')
}