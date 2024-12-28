import wretch, { Wretch, WretchOptions } from 'wretch'

class RequesterApi {
  private requester: Wretch

  constructor(url: string, options: WretchOptions = {}) {
    this.requester = wretch(url, options).headers({
      'Content-Type': 'application/json',
      'User-Agent': 'ManagerApp/Web'
    })
  }

  getRequester() {
    return this.requester
  }

  authenticate(token: string) {
    this.requester = this.requester.auth(`Bearer ${token}`)
  }

  async get(url: string) {
    return this.requester.get(url).json()
  }

  /* eslint-disable  @typescript-eslint/no-explicit-any */
  async post(url: string, body: any) {
    return this.requester.post(url, body).json()
  }

  /* eslint-disable  @typescript-eslint/no-explicit-any */
  async put(url: string, body: any) {
    return this.requester.put(url, body).json()
  }

  async delete(url: string) {
    return this.requester.delete(url).json()
  }
}

export { RequesterApi }
