export default class Http {
  public baseUrl: string
  public headers: Record<string, string> = {}

  constructor(url: string, headers: Record<string, string> = {}) {
    this.baseUrl = url
    this.headers = headers
  }

  private async request(method: string, url: string, headers: Record<string, string> = {}, body?: Record<string, any>) {
    return fetch(url, {
      method,
      headers: {
        ...this.headers,
        ...headers
      },
      body: JSON.stringify(body)
    })
  }

  public get(url: string, headers: Record<string, string> = {}) {
    return this.request('GET', `${this.baseUrl}${url}`, headers)
  }

  public post(url: string, body: Record<string, any>, headers: Record<string, string> = {}) {
    return this.request('POST', `${this.baseUrl}${url}`, headers, body)
  }

  public put(url: string, body: Record<string, any>, headers: Record<string, string> = {}) {
    return this.request('PUT', `${this.baseUrl}${url}`, headers, body)
  }

  public delete(url: string, headers: Record<string, string> = {}, body: Record<string, any> | null) {
    console.log(body)
    return this.request('DELETE', `${this.baseUrl}${url}`, headers, body || {})
  }

  public patch(url: string, body: Record<string, any>, headers: Record<string, string> = {}) {
    return this.request('PATCH', `${this.baseUrl}${url}`, headers, body)
  }

  public options(url: string, headers: Record<string, string> = {}) {
    return this.request('OPTIONS', `${this.baseUrl}${url}`, headers)
  }
}
