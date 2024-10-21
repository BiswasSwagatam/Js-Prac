import { useRef } from "react"

export function useDebounce(value) {
    const timer = useRef()

    function fn() {
        clearTimeout(timer.current)
        timer.current = setTimeout(() => {
            value()
        }, 200)
    }

    return fn
}