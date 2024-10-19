const arr = [1,0,2,3, 7, 6]
// const arr = new Array(5).fill(1)
// arr.forEach((val, i) => {
//     console.log(val, i)
// })

// const sum = arr.reduceRight(function(acc, val) {
//     return acc - val
// },0)

arr.sort(function(a, b) {
    if(a === 3) {
        return -1
    } 
    if(b === 3) {
        return 1
    }
    return a - b
})

console.log(arr)