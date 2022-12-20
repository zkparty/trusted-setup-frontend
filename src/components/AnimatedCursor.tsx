import {
    useEffect,
    useRef,
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
const AnimatedCursor = () => {
  const {height, width} = useWindowDimensions()
  const cursorOuterRef_0 = useRef<any>()
  const cursorOuterRef_1 = useRef<any>()
  const cursorOuterRef_2 = useRef<any>()
  const cursorOuterRef_3 = useRef<any>()

  const onMouseMove = useCallback(({ clientX, clientY }: any) => {
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

    if (cursorOuterRef_0 && cursorOuterRef_0.current){
      cursorOuterRef_0.current.style.top = y + 'px'
      cursorOuterRef_0.current.style.left = x + 'px'
    }

    setTimeout(() => {
      if (cursorOuterRef_1 && cursorOuterRef_1.current){
        cursorOuterRef_1.current.style.top = y + 'px'
        cursorOuterRef_1.current.style.left = x + 'px'
      }
    }, 110)
    setTimeout(() => {
      if (cursorOuterRef_2 && cursorOuterRef_2.current){
        cursorOuterRef_2.current.style.top = y + 'px'
        cursorOuterRef_2.current.style.left = x + 'px'
      }
    }, 200)
    setTimeout(() => {
      if (cursorOuterRef_3 && cursorOuterRef_3.current){
        cursorOuterRef_3.current.style.top = y + 'px'
        cursorOuterRef_3.current.style.left = x + 'px'
      }
    }, 290)
  }, [height, width])

  useEventListener('mousemove', onMouseMove, document)

  return (
    <>
      <TailElement ref={cursorOuterRef_0}></TailElement>
      <TailElement ref={cursorOuterRef_1}></TailElement>
      <TailElement ref={cursorOuterRef_2}></TailElement>
      <TailElement ref={cursorOuterRef_3}></TailElement>
    </>
  )
}

const pulsate = keyframes`
  50% { opacity: 0.2; }
`

const growing = keyframes`
  50% { width: 100px; height: 100px; }
`

const TailElement = styled.div`
  position: fixed;
  border: 1.5px;
  border-radius: 50%;
  pointer-events: none;
  opacity: 0.5;
  width: 130px;
  height: 130px;
  filter: blur(6px);
  background: radial-gradient(
    rgb(255,255,255,0.4) 20%,
    rgb(255,252,187,0.2) 60%
  );
  animation: ${pulsate} 5s ease-out infinite, ${growing} 5s linear infinite;
`

export default AnimatedCursor