class Git {
  static async handleRequest(request) {
    let url = new URL(request.url)
    url.host = 'raw.githubusercontent.com'
    const token = url.searchParams.get('token')
    if (token != null) {
      url.searchParams.delete('token')
    }
    const newRequest = new Request(url.href, request)
    if (token != null) {
      newRequest.headers.append('Authorization', `token ${token}`)
    }
    return await fetch(newRequest)
  }
}

export default Git
