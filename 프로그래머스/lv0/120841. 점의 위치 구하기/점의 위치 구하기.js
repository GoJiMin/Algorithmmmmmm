const solution = (dots) => {
    const [dots1, dots2] = dots
    if(dots1 > 0 && dots2 > 0) return 1;
    if(dots1 < 0 && dots2 > 0) return 2;
    if(dots1 < 0 && dots2 < 0) return 3;
    if(dots1 > 0 && dots2 < 0) return 4;
}