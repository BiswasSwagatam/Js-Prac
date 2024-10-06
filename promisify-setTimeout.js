
function timeoutPromisified(time) {
    return new Promise(function (resolve) {
        setTimeout(resolve, time)
    })
}

const p = timeoutPromisified(3000)

function callback() {
    console.log()
}

p.then(callback)