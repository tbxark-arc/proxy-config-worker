import FetcherFactory from '../utils/fetcher'
import StringifyFactory from '../utils/stringify'
import HookPolicy from '../hook/policy'

class Policy {
  static async handleRequestWithParams(params) {
    let text = HookPolicy.before(params)
    if (!text) {
      const port = params.get('port')
      const token = params.get('token')
      const style = params.get('style')
      if (!port || port.length == 0) {
        return new Response('port not found', { status: 400 })
      }
      if (!token || token.length == 0) {
        return new Response('token not found', { status: 400 })
      }
      if (!style || style.length == 0) {
        return new Response('style not found', { status: 400 })
      }
      const fetchers = FetcherFactory.build(style)
      const configs = []
      for (const fetcher of fetchers) {
        const config = await fetcher.fetch(port, token)
        configs.push(config)
      }
      text = StringifyFactory.renderPolicy(configs, style)
      text = HookPolicy.after(token, port, style, text)
    }
    return new Response(text, { status: 200 })
  }
}

export default Policy
