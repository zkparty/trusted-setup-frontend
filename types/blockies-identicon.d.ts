declare module 'blockies-identicon' {
  const api = {
    render: function (
      opts: {
        seed?: string
        color?: string
        bgcolor?: string
        size?: number
        scale?: number
        spotcolor?: string
      },
      ref: HTMLCanvasElement
    ): void {}
  }

  export default api
}
