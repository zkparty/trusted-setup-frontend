import { toParams, toQuery } from './utils'

class OAuthPopup {
  private window: Window | null = null
  private _iid: number | null = null
  private promise: Promise<{ [key: string]: string }> = null!

  constructor(
    readonly id: string,
    readonly url: string,
    readonly options = {}
  ) {
    this.id = id
    this.url = url
    this.options = options
  }

  open() {
    const { url, id, options } = this

    this.window = window.open(url, id, toQuery(options, ','))
  }

  close() {
    this.cancel()
    if (this.window) this.window.close()
  }

  poll() {
    this.promise = new Promise<{ [key: string]: string }>((resolve, reject) => {
      this._iid = window.setInterval(() => {
        try {
          const popup = this.window

          if (!popup || popup.closed !== false) {
            this.close()

            reject(new Error('The popup was closed'))

            return
          }

          if (
            popup.location.href === this.url ||
            popup.location.pathname === 'blank'
          ) {
            return
          }

          const params = toParams(popup.location.search.replace(/^\?/, ''))

          resolve(params)

          this.close()
        } catch (error) {
          /*
           * Ignore DOMException: Blocked a frame with origin from accessing a
           * cross-origin frame.
           */
        }
      }, 500)
    })
  }

  cancel() {
    if (this._iid) {
      window.clearInterval(this._iid)
      this._iid = null
    }
  }

  async wait() {
    return await this.promise
  }

  static open(id: string, url: string, options: any) {
    const popup = new this(id, url, options)

    popup.open()
    popup.poll()
    return popup
  }
}

export default OAuthPopup
