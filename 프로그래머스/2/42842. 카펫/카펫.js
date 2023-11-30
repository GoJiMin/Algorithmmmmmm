const solution = (brown, yellow) => {
    const squareSize = brown + yellow;
    const half = ~~(squareSize / 2)
    let width = 1;
    let height = 1;
    
    for(let i = width; i < half; i++) {
        for(let j = 3; j < half; j++) {
            if(i * j === squareSize) {
                if((i - 2) * (j - 2) === yellow)
                return [j, i]
                break;
            }
            if(i * j > squareSize) {
                break;
            }
        }
    }
    
    
}