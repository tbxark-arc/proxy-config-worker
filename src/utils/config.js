import surge_config from '../resource/config/surge/config'
import clash_config from '../resource/config/clash/config'

class ConfigFileRender {
  static render(token, port, style) {
    let raw = ''
    switch (style) {
      case 'rocket':
      case 'surge':
        raw = surge_config
        break
      case 'clash':
        raw = clash_config
        break
      default:
        raw = ''
        break
    }
    raw = raw
      .replaceAll('##PORT##', port)
      .replaceAll('##TOKEN##', token)
      .replaceAll('##STYLE##', style)
      .replaceAll('##DOMAIN##', DOMAIN)
    return raw
  }
}

export default ConfigFileRender
