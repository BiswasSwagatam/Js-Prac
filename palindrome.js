function isPalindrome(str) {
    str = str.toLowerCase();
    if(str === str.split('').reverse().join('')) {
        return true
    } else {
        return false
    }
}

console.log(isPalindrome("R*u9Mm9u*r"))