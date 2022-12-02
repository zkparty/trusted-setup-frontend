import {
    useEffect,
    useRef,
    forwardRef,
    useCallback,
  } from 'react'
import styled, { keyframes } from 'styled-components'
import useWindowDimensions from '../hooks/useWindowDimensions'

function useEventListener(eventName: string, handler: ({ clientX, clientY }: any) => void, element = document) {
  const savedHandler = useRef<any>()

  useEffect(() => {
    savedHandler.current = handler
  }, [handler])

  useEffect(() => {
    const isSupported = element && element.addEventListener
    if (!isSupported) return

    const eventListener = (event: any) => savedHandler.current(event)

    element.addEventListener(eventName, eventListener)

    return () => {
      element.removeEventListener(eventName, eventListener)
    }
  }, [eventName, element])
}

/**
 * Animated Cursor
 * Replaces the native cursor with a custom animated cursor.
 *
 * @author Stephen Scaff
 */
const AnimatedCursor = forwardRef((_, bgRef: any) => {
  const {height, width} = useWindowDimensions()
  const cursorOuterRef_1 = useRef<any>()
  const cursorOuterRef_2 = useRef<any>()
  const cursorOuterRef_3 = useRef<any>()
  const cursorOuterRef_4 = useRef<any>()

  const onMouseMove = useCallback(({ clientX, clientY }: any) => {
    bgRef!.current.style.setProperty('--cursorX', clientX + 'px')
    bgRef!.current.style.setProperty('--cursorY', clientY + 'px')

    let x = 0
    if (clientX > (width/2)){
      x = clientX + 30
    } else {
      x = clientX - 70
    }

    let y = 0
    if (clientY > (height/2)){
      y = clientY + 10
    } else {
      y = clientY - 70
    }

    setTimeout(() => {
      cursorOuterRef_1!.current.style.top = y + 'px'
      cursorOuterRef_1!.current.style.left = x + 'px'
    }, 90)
    setTimeout(() => {
      cursorOuterRef_2!.current.style.top = y + 'px'
      cursorOuterRef_2!.current.style.left = x + 'px'
    }, 180)
    setTimeout(() => {
      cursorOuterRef_3!.current.style.top = y + 'px'
      cursorOuterRef_3!.current.style.left = x + 'px'
    }, 270)
    setTimeout(() => {
      cursorOuterRef_4!.current.style.top = y + 'px'
      cursorOuterRef_4!.current.style.left = x + 'px'
    }, 360)
  }, [bgRef, height, width])

  useEventListener('mousemove', onMouseMove, document)

  return (
    <>
      <TailElement ref={cursorOuterRef_1}></TailElement>
      <TailElement ref={cursorOuterRef_2}></TailElement>
      <TailElement ref={cursorOuterRef_3}></TailElement>
      <TailElement ref={cursorOuterRef_4}></TailElement>
    </>
  )
})

const pulsate = keyframes`
  50% { opacity: 0.4; }
`

const growing = keyframes`
  50% { width: 40px; height: 40px; }
`

const TailElement = styled.div`
  position: fixed;
  border: 1.5px;
  border-radius: 50%;
  pointer-events: none;
  width: 90px;
  height: 90px;
  background-color: #fffcbb;
  opacity: 0.1;
  filter: blur(6px);
  animation: ${pulsate} 5s ease-out infinite, ${growing} 9s linear infinite;
`

export default AnimatedCursor

