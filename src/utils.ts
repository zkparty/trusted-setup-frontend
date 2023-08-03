import ROUTES from './routes'
import { ErrorRes } from './types'
import { OAuthRes } from './store/auth'

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

export function isSafari(): boolean {
  const isSafari = (window as any).safari !== undefined
  return Boolean(isSafari)
}

export function isBgRoute(route: string): boolean {
  return [
    ROUTES.CONTRIBUTING,
    ROUTES.COMPLETE,
    ROUTES.SIGNIN,
    ROUTES.DOUBLE_SIGN,
    ROUTES.ENTROPY_INPUT,
    ROUTES.LOBBY,
    ROUTES.LOBBY_FULL
  ].includes(route)
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

export function toParams(query: string) {
  const q = query.replace(/^\??\//, '')

  return q.split('&').reduce<{ [key: string]: string }>((values, param) => {
    const [key, value] = param.split('=')

    values[key] = value

    return values
  }, {})
}

export function toQuery(params: { [key: string]: string }, delimiter = '&') {
  const keys = Object.keys(params)
  return keys.reduce((str, key, index) => {
    if (typeof params[key] === 'undefined' || params[key] === null) return ''
    let query = `${str}${key}=${params[key]}`
    if (index < keys.length - 1) {
      query += delimiter
    }
    return query
  }, '')
}

export function isSuccessRes<T extends Object>(res: T | ErrorRes): res is T {
  return !res.hasOwnProperty('error')
}

export function parseErrorMessage(res: ErrorRes): string {
  let text = res.error || res.message || ''
  let message = text.replaceAll('+', ' ')
  return message
}

export async function sleep(ms: number) {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve()
    }, ms)
  })
}

export function validateSigninParams(params: {
  [key: string]: string
}): params is OAuthRes {
  return (
    !!params.exp &&
    !!params.nickname &&
    !!params.provider &&
    !!params.session_id &&
    !!params.sub
  )
}

export async function processIdentity(
  provider: string,
  nickname: string
): Promise<string> {
  let identity = ''
  switch (provider) {
    case 'Ethereum':
      if (nickname.substring(0, 2) !== '0x') nickname = '0x' + nickname
      identity = 'eth|' + nickname
      break
    case 'Github':
      if (nickname.substring(0, 1) === '@') nickname = nickname.substring(1)
      const githubRes = await fetch(
        `https://api.github.com/users/${nickname}`
      ).then((_res) => _res.json())
      identity = 'git|' + githubRes.id + '|@' + nickname
      break
    default:
      console.error('Unregistered auth provider for identity string')
      break
  }
  return identity
}

export function buildEIP712Message(potPubkeys: string[] | null): {
  domain: any
  message: any
  primaryType: string
  types: any
} {
  // built the message to be signed
  const numG1Powers = [4096, 8192, 16384, 32768]
  const potPubkeysObj = []
  for (let i = 0; i < 4; i++) {
    const element = {
      numG1Powers: numG1Powers[i],
      numG2Powers: 65,
      potPubkey: potPubkeys![i]
    }
    potPubkeysObj.push(element)
  }
  const types = {
    PoTPubkeys: [{ name: 'potPubkeys', type: 'contributionPubkey[]' }],
    contributionPubkey: [
      { name: 'numG1Powers', type: 'uint256' },
      { name: 'numG2Powers', type: 'uint256' },
      { name: 'potPubkey', type: 'bytes' }
    ]
  }
  const domain = {
    name: 'Ethereum KZG Ceremony',
    version: '1.0',
    chainId: 1
  }
  const message = {
    potPubkeys: potPubkeysObj
  }
  return {
    primaryType: 'PoTPubkeys',
    domain,
    message,
    types
  }
}
