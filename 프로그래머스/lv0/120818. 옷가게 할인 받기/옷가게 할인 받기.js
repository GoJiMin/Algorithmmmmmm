const solution = (price) => {
    const sale = [500000, 300000, 100000].find(e => price >= e)
    switch(sale) {
        case 100000 :
            return ~~(price * 0.95)
        case 300000 :
            return ~~(price * 0.9)
        case 500000 :
            return ~~(price * 0.8)
        default :
            return price
    }
}


