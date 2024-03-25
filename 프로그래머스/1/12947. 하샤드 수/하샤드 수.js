const solution = x => {
    const digitSum = (''+ x).split("").reduce((acc, cur) => +acc + +cur);
    
    return x % digitSum === 0
}