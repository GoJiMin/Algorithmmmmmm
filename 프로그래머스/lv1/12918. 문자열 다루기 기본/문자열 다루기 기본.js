const solution = s => {
    const isStr = s.match(new RegExp(/[a-zA-z]/))
    const lenChk = (s.length === 4 || s.length === 6) ? true : false
    
    return !isStr && lenChk ? true : false
}