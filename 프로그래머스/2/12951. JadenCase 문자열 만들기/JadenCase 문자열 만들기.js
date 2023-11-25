const solution = s => {
    const arr = s.split(' ');
    let result = arr.map(word => word.toLowerCase())
    
    for(let i = 0; i < result.length; i++) {
        if(result[i][0]) {
            const upper = result[i][0].toUpperCase();
            result[i] = upper + result[i].substring(1);
        }

    }
    
    return result.join(' ')
}