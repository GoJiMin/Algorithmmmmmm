const solution = (s) => {
    const p = [...s].filter(el => el === 'p' | el === 'P').length
    const y = [...s].filter(el => el === 'y' | el === 'Y').length
    
    return p === y ? true : false
}