const solution = (numbers) => {
    const nums = new Map([
        ["one", 1],
        ["two", 2],
        ["three", 3],
        ["four", 4],
        ["five", 5],
        ["six", 6],
        ["seven", 7],
        ["eight", 8],
        ["nine", 9],
        ["zero", 0]
    ])
    
    for(let [key, value] of nums) {
        numbers = numbers.replace(new RegExp(key, 'g'), value)
    }
    
    return +numbers
}