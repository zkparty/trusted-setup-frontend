import {
    useEffect,
    useRef,
    useCallback,
  } from 'react'
import styled, { keyframes } from 'styled-components'

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
  const cursorInnerRef = useRef<any>()
  const cursorOuterRef_1 = useRef<any>()
  const cursorOuterRef_2 = useRef<any>()
  const cursorOuterRef_3 = useRef<any>()

  const onMouseMove = useCallback(({ clientX, clientY }: any) => {
    cursorInnerRef!.current.style.top = clientY + 'px'
    cursorInnerRef!.current.style.left = clientX + 'px'
    setTimeout(() => {
      cursorOuterRef_1!.current.style.top = clientY + 'px'
      cursorOuterRef_1!.current.style.left = clientX + 'px'
    }, 80)
    setTimeout(() => {
      cursorOuterRef_2!.current.style.top = clientY + 'px'
      cursorOuterRef_2!.current.style.left = clientX + 'px'
    }, 160)
    setTimeout(() => {
      cursorOuterRef_3!.current.style.top = clientY + 'px'
      cursorOuterRef_3!.current.style.left = clientX + 'px'
    }, 240)
  }, [])

  useEventListener('mousemove', onMouseMove, document)

  return (
    <>
      <CursorElement ref={cursorInnerRef}></CursorElement>
      <TailElement ref={cursorOuterRef_1}></TailElement>
      <TailElement ref={cursorOuterRef_2}></TailElement>
      <TailElement ref={cursorOuterRef_3}></TailElement>
    </>
  )
}

const pulsate = keyframes`
  50% { opacity: 0.9; filter: blur(3px); }
`

const growing = keyframes`
  50% { width: 40px; height: 40px; }
`

const CursorElement = styled.div`
  position: fixed;
  z-index: 999;
  border: 1.5px;
  border-radius: 50%;
  pointer-events: none;
  background-color: #fffcbb;

  opacity: 0.4;
  filter: blur(6px);
  width: 120px;
  height: 120px;

  animation: ${pulsate} 5s ease-out infinite, ${growing} 5s linear infinite;
`

const TailElement = styled.div`
  position: fixed;
  border: 1.5px;
  border-radius: 50%;
  pointer-events: none;
  width: 80px;
  height: 80px;
  background-color: #fffcbb;
  opacity: 0.4;
  filter: blur(6px);
`

export default AnimatedCursor

