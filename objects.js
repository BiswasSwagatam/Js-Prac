const web = {
    name: 'Algorithms',
    rating: 5,
    founders: ['clement', 'james']
}

// const obj = {
//     foo: 'bar',
//     hello: 'world',
//     __proto__: web
// }

// for (key in obj) {
//     console.log(key, obj[key])
// }

web.toString = function() {
    return 'Hello'
}

web.valueOf = function() {
    return 2
}

console.log(web + 1)
