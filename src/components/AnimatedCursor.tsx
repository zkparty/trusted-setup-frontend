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

  const onMouseMove = useCallback(({ clientX, clientY }: any) => {
    cursorInnerRef.current.style.top = clientY + 'px'
    cursorInnerRef.current.style.left = clientX + 'px'
  }, [])

  useEventListener('mousemove', onMouseMove, document)

  return (
      <CursorElement ref={cursorInnerRef}></CursorElement>
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
  border-style: solid;
  border-color: #dc9d00;
  pointer-events: none;
  background-color: #fffcbb;

  opacity: 0.4;
  filter: blur(6px);
  width: 80px;
  height: 80px;

  animation: ${pulsate} 2s ease-out infinite, ${growing} 2s linear infinite;
`

export default AnimatedCursor

