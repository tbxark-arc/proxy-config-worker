import Mode from '../resource/mode'

class ClashStringify {
  ss(item) {
    let text = ''
    text += `- name: "${item.name}"\n`
    text += `  type: ss\n`
    text += `  server: ${item.host}\n`
    text += `  port: ${item.port}\n`
    text += `  udp: true\n`
    text += `  cipher: ${item.method}\n`
    text += `  password: "${item.password}"\n`
    if (item.obfs != null) {
      text += `  plugin: obfs\n`
      text += `  plugin-opts:\n`
      text += `    mode: ${item.obfs.mode}\n`
      text += `    host: ${item.obfs.host}\n`
    }
    return text
  }

  ssr(item) {
    let text = ''
    text += `- name: "${item.name}"\n`
    text += `  type: ssr\n`
    text += `  server: ${item.host}\n`
    text += `  port: ${item.port}\n`
    text += `  udp: true\n`
    text += `  cipher: ${item.method}\n`
    text += `  password: "${item.password}"\n`
    if (item.obfs != null) {
      text += `  obfs: ${item.obfs.mode}\n`
      text += `  protocol: ${item.obfs.protocol}\n`
      text += `  obfs-param: ${item.obfs.obfsParam}\n`
      text += `  protocol-param: ${item.obfs.protoParam}\n`
    }
    return text
  }

  trojan(item) {
    let text = ''
    text += `- name: \"${item.name}\"\n`
    text += `  type: trojan\n`
    text += `  server: ${item.host}\n`
    text += `  port: ${item.port}\n`
    text += `  password: "${item.password}"\n`
    text += `  sni: ${item.port}\n`
    return text
  }

  snell(item) {
    // let text = ''
    // text +=  `- name: \"${item.name}\"\n`
    // text +=  `  type: snell\n`
    // text +=  `  server: ${item.host}\n`
    // text +=  `  port: ${item.port}\n`
    // text +=  `  psk: "${item.password}"\n`
    return null
  }

  formatPolicy(text) {
    return `proxies:\n${text
      .split('\n')
      .map(line => {
        return `  ${line}`
      })
      .join('\n')}`
  }
}

class SurgeStringify {
  ss(item) {
    let text = `${item.name} = ss, ${item.host}, ${item.port}, encrypt-method=${item.method}, password=${item.password}`
    if (item.obfs != null) {
      text = `${text}, obfs=${item.obfs.mode}, obfs-host=${item.obfs.host}`
    }
    text = `${text}, udp-relay=true, tfo=true`
    return text
  }

  ssr(item) {
    return null
  }

  trojan(item) {
    return `${item.name} = trojan, ${item.host}, ${item.port}, password=${item.password}, sni=${item.sni}`
  }

  snell(item) {
    return `${item.name} = snell, ${item.host}, ${item.port}, psk=${item.password}, obfs=tls, version=2, tfo=true`
  }

  formatPolicy(text) {
    return text
  }
}

class __StringifyFactory {
  static build(mode) {
    switch (mode) {
      case Mode.Mode_Clash:
        return new ClashStringify()
      case Mode.Mode_Rocket:
      case Mode.Mode_Surge:
        return new SurgeStringify()
      default:
        return new SurgeStringify()
    }
  }
}

class StringifyFactory {
  static renderPolicy(itemsList, mode) {
    const stringify = __StringifyFactory.build(mode)
    const text = itemsList
      .map(list => {
        if (list.length === 0) {
          return ''
        }
        return list
          .map(item => {
            switch (item.type) {
              case 'ss':
                return stringify.ss(item)
              case 'ssr':
                return stringify.ssr(item)
              case 'trojan':
                return stringify.trojan(item)
              case 'snell':
                return stringify.snell(item)
              default:
                return null
            }
          })
          .filter(line => {
            return line != null && line.length > 0
          })
          .join('\n')
      })
      .join('\n')
    return stringify.formatPolicy(text)
  }
}

export default StringifyFactory
