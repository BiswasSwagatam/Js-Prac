function calculateTime(n) {
    let start = performance.now()
    let sum = 0
    for (let i = 0; i <= n; i++) {
        sum += i
    }
    let end = performance.now()
    let elapsed = (end - start)/1000
    return elapsed
}

console.log(calculateTime(1000000000))