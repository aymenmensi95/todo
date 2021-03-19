import { useEffect, useMemo, useRef } from "react"

const useClickOutside = (closeFunc, ScrollingElement) => {
  const ScrollingElementNode = useMemo(() => ScrollingElement || document.body, [ScrollingElement])
  const node = useRef()

  const handleClickOutside = e => {
    if (node.current.contains(e.target)) {
      return
    }
    closeFunc(e)
  }

  const handleLossOfFocus = e => {
    closeFunc(e)
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('scroll', handleLossOfFocus)
    window.addEventListener('resize', handleLossOfFocus)
    if (ScrollingElementNode) {
      ScrollingElementNode.addEventListener('scroll', handleLossOfFocus)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('scroll', handleLossOfFocus)
      window.removeEventListener('resize', handleLossOfFocus)
      if (ScrollingElementNode) {
        ScrollingElementNode.removeEventListener('scroll', handleLossOfFocus)
      }
    }
  }, [ScrollingElementNode])

  return node
}

export default useClickOutside