import Mode from '../resource/mode'

class ShadowsocksFetcher {
  async fetch(port, token) {
    try {
      const shadowsocksReq = new Request(
        `https://cdnapi.fyapi.net/index.php?m=fyzhujicloudpane&command=FYAUTHAPISurge&port=${port}&authcode=${token}`,
      )
      const shadowsocksRes = await fetch(shadowsocksReq)
      let shadowsocksConfig = await shadowsocksRes.text()
      shadowsocksConfig = Array.from(shadowsocksConfig.split('\n'))
        .filter(item => {
          return item.indexOf('SSEncrypt.module') > 0
        })
        .map(item => {
          const ele = item.split(',').map(e => {
            return e.replaceAll(' ', '')
          })
          return {
            type: 'ss',
            name: 'FY-ss-' + ele[1].split('.')[0],
            host: ele[1],
            port: ele[2],
            method: ele[3],
            password: ele[4],
            obfs: {
              host: ele[7].replace('obfs-host=', ''),
              mode: ele[6].replace('obfs=', ''),
            },
          }
        })
      return shadowsocksConfig
    } catch (e) {
      console.error(e)
      return []
    }
  }
}

class ShadowsocksRFetcher {
  async fetch(port, token) {
    try {
      console.log('update trojan config')
      const shadowsocksrReq = new Request(
        `https://cdnapi.fyapi.net/index.php?m=fyzhujicloudpane&command=FYAUTHAPIComSub&port=${port}&authcode=${token}`,
      )
      const shadowsocksrRes = await fetch(shadowsocksrReq)
      let shadowsocksrConfig = await shadowsocksrRes.text()
      shadowsocksrConfig = atob(shadowsocksrConfig)
      shadowsocksrConfig = shadowsocksrConfig
        .split('\n')
        .filter(item => {
          return item.indexOf('ssr') == 0
        })
        .map(item => {
          return atob(
            item
              .replace('ssr://', '')
              .replace(/_/g, '/')
              .replace(/-/g, '+'),
          )
        })
        .map(item => {
          const cmp = item.split('/?')
          const base = cmp[0].split(':')
          const obfs = cmp[1].split('&').map(item => {
            const ele = item.split('=')
            return {
              key: ele[0],
              value: atob(ele[1].replace(/_/g, '/').replace(/-/g, '+')),
            }
          })
          return {
            type: 'ssr',
            name: 'FY-ssr-' + base[0].split('.')[0],
            host: base[0],
            port: base[1],
            method: base[3],
            password: base[5],
            obfs: {
              protocol: base[2],
              mode: base[4],
              obfsParam: obfs.filter(item => {
                return item.key == 'obfsparam'
              })[0].value,
              protoParam: obfs.filter(item => {
                return item.key == 'protoparam'
              })[0].value,
            },
          }
        })
      return shadowsocksrConfig
    } catch (e) {
      console.error(e)
      return []
    }
  }
}

class TrojanFetcher {
  async fetch(port, token) {
    try {
      console.log('update trojan config')
      const trojanReq = new Request(
        `https://cdnapi.fyapi.net/index.php?m=fyzhujicloudpane&command=FYAUTHAPIComSub&port=${port}&type=trojan&authcode=${token}`,
      )
      const trojanRes = await fetch(trojanReq)
      let trojanConfig = await trojanRes.text()
      trojanConfig = atob(trojanConfig)
      trojanConfig = trojanConfig
        .split('\n')
        .filter(item => {
          return item.indexOf('trojan') == 0
        })
        .map(item => {
          const url = new URL(item.replaceAll(' ', ''))
          return {
            type: 'trojan',
            name: 'FY-trojan-' + url.hostname.split('.')[0],
            host: url.hostname,
            port: url.port,
            password: url.username,
            sni: url.searchParams.get('sni'),
          }
        })
      return trojanConfig
    } catch (e) {
      console.error(e)
      return []
    }
  }
}

class FetcherFactory {
  static build(mode) {
    switch (mode) {
      case Mode.Mode_Rocket:
      case Mode.Mode_Surge:
        return [new ShadowsocksFetcher(), new TrojanFetcher()]
      case Mode.Mode_Clash:
        return [
          new ShadowsocksFetcher(),
          new ShadowsocksRFetcher(),
          new TrojanFetcher(),
        ]
      default:
        return []
    }
  }
}

export default FetcherFactory
