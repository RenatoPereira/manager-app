import wretch, { Wretch, WretchOptions } from 'wretch'

class RequesterApi {
  private requester: Wretch
  private accessToken: string | undefined

  constructor(url: string, options: WretchOptions = {}) {
    this.requester = wretch(url, options).headers({
      'Content-Type': 'application/json',
      'User-Agent': 'ManagerApp/Web'
    })
  }

  getRequester() {
    return this.requester
  }

  authenticate(token?: string) {
    this.accessToken = token
  }

  #request(url: string) {
    let requester = this.requester

    if (this.accessToken) {
      requester = requester.auth(`Bearer ${this.accessToken}`)
    }

    return requester.url(url)
  }

  async get(url: string) {
    return this.#request(url).get().json()
  }

  /* eslint-disable  @typescript-eslint/no-explicit-any */
  async post(url: string, body: any) {
    return this.#request(url).post(body).json()
  }

  /* eslint-disable  @typescript-eslint/no-explicit-any */
  async put(url: string, body: any) {
    return this.#request(url).put(body).json()
  }

  async delete(url: string) {
    return this.#request(url).delete().json()
  }
}

export { RequesterApi }
