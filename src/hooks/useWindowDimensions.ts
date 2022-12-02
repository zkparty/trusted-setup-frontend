// https://stackoverflow.com/questions/36862334/get-viewport-window-height-in-reactjs
import { useState, useEffect } from 'react'


type WindowDimensions = {
    width: number
    height: number
}

const getWindowDimensions = (): WindowDimensions => {
    const { innerWidth, innerHeight } = window

    return {
        width: innerWidth,
        height: innerHeight
    }
}

const useWindowDimensions = (): WindowDimensions => {
    const [windowDimensions, setWindowDimensions] = useState<WindowDimensions>({width: 0, height: 0})

    const handleResize = () => {
        setWindowDimensions(getWindowDimensions())
    }

    useEffect(() => {
        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return windowDimensions
}

export default useWindowDimensions