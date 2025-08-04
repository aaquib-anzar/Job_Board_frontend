import React, {useState, useEffect, useRef} from "react"

export const useDebounce = (value, delay=500) => {
    const[deBounceValue, setdeBounceValue] = useState()
    const timer = useRef()
    useEffect(() => {
        clearTimeout(timer.current)
        timer.current = setTimeout(() => {setdeBounceValue(value)},delay)
        return () => clearTimeout(timer.current)
    },[value, delay])

    return deBounceValue
}