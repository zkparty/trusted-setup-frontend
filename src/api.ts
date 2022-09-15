const API_ROOT = 'http://127.0.0.1:5000'

class APIClient {
  async getRequestLink() {
    const res = await fetch(`${API_ROOT}/auth/request_link`)
    return await res.json()
  }

  async getAuthorized(code: string, state: string) {
    const res = await fetch(
      `${API_ROOT}/auth/callback/github?code=${code}&state=${state}`
    )
    return await res.json()
  }

  async getStatus() {}

  async getCurrentState() {}

  async joinSlot() {}

  async contribute() {}
}

export default new APIClient()
