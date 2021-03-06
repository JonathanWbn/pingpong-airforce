import React from 'react'

export default function useInterval(callback: Function, delay: number | null) {
  const savedCallback = React.useRef<Function>(null)

  React.useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  React.useEffect(() => {
    function tick() {
      savedCallback.current()
    }
    if (delay !== null) {
      let id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}
