const n = +(require('fs').readFileSync(0).toString())

if (n % 4 === 0 && (n % 100 !== 0 || n % 400 === 0)) {
    console.log(1);
} else {
    console.log(0);
}