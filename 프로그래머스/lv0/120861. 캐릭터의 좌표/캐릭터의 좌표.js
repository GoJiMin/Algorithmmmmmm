const solution = (keyInput, board) => {
    let res = [0, 0];
    
    const maxW = (board[0] - 1) / 2;
    const maxH = (board[1] - 1) / 2;
    
    for(let k of keyInput) {
        switch(k) {
            case 'left': 
                if(-res[0] < maxW) res[0]--;
                break;
            case 'right': 
                if(res[0] < maxW) res[0]++;
                break;
            case 'up': 
                if(res[1] < maxH) res[1]++;
                break;
            case 'down':
                if(-res[1] < maxH) res[1]--;
                break;
            default:
                break;
        }
    }
    
    return res
}