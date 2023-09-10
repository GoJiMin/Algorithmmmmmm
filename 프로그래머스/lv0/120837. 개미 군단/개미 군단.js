const solution = (hp) => {
    const a1 = ~~(hp / 5);
    const a2 = ~~(hp % 5 / 3);
    const a3 = ~~(hp % 5 % 3 / 1);
    
    return a1 + a2 + a3
}