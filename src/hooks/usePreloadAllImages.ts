import { useEffect, useState } from 'react'
import images from '../assets/images'

export default function usePreloadAllImages() {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    // load all images
    ;(async () => {
      await Promise.all(
        images.map((image) => {
          return new Promise<void>((resolve) => {
            const i = new Image()
            i.src = image
            i.onload = () => {
              resolve()
            }
          })
        })
      )

      setLoaded(true)
    })()
  }, [])

  return loaded
}
