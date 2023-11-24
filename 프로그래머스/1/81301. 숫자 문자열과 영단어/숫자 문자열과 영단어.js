const solution = s => {
    const numbers = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
    let result = s
    
    for(let i = 0; i < numbers.length; i++) {
        let arr = result.split(numbers[i]);
        result = arr.join(i);
    }
    
    return result / 1
}