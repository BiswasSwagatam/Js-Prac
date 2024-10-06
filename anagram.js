function isAnagram(s, t) {
    if (s.length !== t.length) {
        return false
    }

    function sortString(str) {
        return str.toLowercase().split('').sort().join('')
    }

    if (sortString(s) === sortString(t)) {
        return true
    } else {
        return false
    }
}