const gcd = (numer, denom) => {
    if (denom === 0 ) return numer;
    return gcd(denom, numer % denom)
}

const solution = (numer1, denom1, numer2, denom2) => {
    const numer = numer1 * denom2 + numer2 * denom1;
    const denom = denom1 * denom2;
    
    const result = gcd(numer, denom);
    
    return  [~~(numer / result), ~~(denom / result)]
}