import ConfigFileRender from '../utils/config'
import HookConfig from '../hook/config'

class Config {
  static async handleRequestWithParams(params) {
    let text = HookConfig.before(params)
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
      text = ConfigFileRender.render(token, port, style)
      text = HookConfig.after(token, port, style, text)
    }
    return new Response(text, { status: 200 })
  }
}

export default Config
