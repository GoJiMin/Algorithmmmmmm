const solution = (s) => s.split(' ').map(v => {
    let result = '';
    for(let i = 0; i < v.length; i++) {
        result += i % 2 === 0 ? v[i].toUpperCase() : v[i].toLowerCase();
    }
    
    return result;
}).join(' ')