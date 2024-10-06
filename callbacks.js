const  fs = require('fs')

function setTimeoutPromisified(time) {
    return new Promise(function (resolve) {
        setTimeout(resolve, time)
    })
}

function readFile() {
    return new Promise(function(resolve){
        fs.readFile('a.txt', 'utf8', function(err, data) {
            resolve(console.log(data))
        })
    })
}
  
async function solve() {
    await readFile();
    
    // await setTimeoutPromisified(3000);
    // console.log("hello");
    // await setTimeoutPromisified(5000);
    // console.log("hi there");
}
  
solve();



// p = setTimoutPromisified(1000)
// p = setTimoutPromisified(3000)
// p = setTimoutPromisified(5000)

// function callback() {
//     console.log("Hi")
// }

// p.then(callback)
// // setTimeout(function (){
// //     console.log("Hello1s")
// //     setTimeout(function (){
// //         console.log("Hello2s")
// //     }, 2000)
// // }, 1000)