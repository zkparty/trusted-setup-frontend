// check if user agent is mobile device
export function isMobile(): boolean {
  const userAgent =
    typeof navigator === 'undefined' ? 'SSR' : navigator.userAgent

  const isAndroid = Boolean(userAgent.match(/Android/i))
  const isIos = Boolean(userAgent.match(/iPhone|iPad|iPod/i))
  const isOpera = Boolean(userAgent.match(/Opera Mini/i))
  const isWindows = Boolean(userAgent.match(/IEMobile/i))

  return Boolean(isAndroid || isIos || isOpera || isWindows)
}

export function stringToColor(str: string) {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  let color = '#'
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff
    color += ('00' + value.toString(16)).substr(-2)
  }
  return color
}
