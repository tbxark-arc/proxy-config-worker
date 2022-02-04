const clash_fd_config_template = `
mixed-port: 7890
allow-lan: false
bind-address: '*'
mode: rule
log-level: info
ipv6: false
external-controller: 127.0.0.1:9090

dns:
  enable: false
  listen: 0.0.0.0:53
  default-nameserver:
    - 223.5.5.5
  enhanced-mode: redir-host
  fake-ip-range: 198.18.0.1/16

  fake-ip-filter:
    - '*.lan'
    - localhost.ptlogin2.qq.com
    - '+.srv.nintendo.net'
    - '+.stun.playstation.net'
    - '+.msftconnecttest.com'
    - '+.msftncsi.com'
    - '+.xboxlive.com'
    - 'msftconnecttest.com'
    - 'xbox.*.microsoft.com'

  nameserver:
    - https://223.5.5.5/dns-query

  fallback:
    - https://1.1.1.1/dns-query

  fallback-filter:
    geoip: true

proxies:

proxy-providers:
  online:
    type: http
    url: 'https://##DOMAIN##/policy?port=##PORT##&token=##TOKEN##&style=clash'
    interval: 3600
    path: ./Proxy/clash-online.yaml
    health-check:
      enable: true
      interval: 600
      url: http://www.gstatic.com/generate_204

proxy-groups:
  - name: 'Proxy'
    type: select
    proxies:
      - Best
      - Fallback
      - Select
      - DIRECT

  - name: 'Final'
    type: select
    proxies:
      - DIRECT
      - Proxy

  - name: 'China'
    type: select
    proxies:
      - DIRECT
      - Proxy

  - name: 'Block'
    type: select
    proxies:
      - REJECT
      - DIRECT

  - name: 'Best'
    type: url-test
    url: 'http://www.gstatic.com/generate_204'
    interval: 300
    use:
      - online

  - name: 'Fallback'
    type: fallback
    use:
      - online

  - name: 'Select'
    type: select
    use:
      - online

rule-providers:
  Unbreak:
    type: http
    behavior: classical
    path: ./RuleSet/Unbreak.yaml
    url: https://##DOMAIN##/git/DivineEngine/Profiles/master/Clash/RuleSet/Unbreak.yaml
    interval: 86400

  Streaming:
    type: http
    behavior: classical
    path: ./RuleSet/StreamingMedia/Streaming.yaml
    url: https://##DOMAIN##/git/DivineEngine/Profiles/master/Clash/RuleSet/StreamingMedia/Streaming.yaml
    interval: 86400

  Global:
    type: http
    behavior: classical
    path: ./RuleSet/Global.yaml
    url: https://##DOMAIN##/git/DivineEngine/Profiles/master/Clash/RuleSet/Global.yaml
    interval: 86400

  Scholar:
    type: http
    behavior: classical
    path: ./RuleSet/Extra/Scholar.yaml
    url: https://##DOMAIN##/git/DivineEngine/Profiles/master/Clash/RuleSet/Extra/Scholar.yaml
    interval: 86400

  Telegram:
    type: http
    behavior: classical
    path: ./RuleSet/Extra/Telegram/Telegram.yaml
    url: https://##DOMAIN##/git/DivineEngine/Profiles/master/Clash/RuleSet/Extra/Telegram/Telegram.yaml
    interval: 86400

  Steam:
    type: http
    behavior: classical
    path: ./RuleSet/Extra/Game/Steam.yaml
    url: https://##DOMAIN##/git/DivineEngine/Profiles/master/Clash/RuleSet/Extra/Game/Steam.yaml
    interval: 86400

  Advertising:
    type: http
    behavior: classical
    path: ./RuleSet/Guard/Advertising.yaml
    url: https://##DOMAIN##/git/DivineEngine/Profiles/master/Clash/RuleSet/Guard/Advertising.yaml
    interval: 86400

  Privacy:
    type: http
    behavior: classical
    path: ./RuleSet/Guard/Privacy.yaml
    url: https://##DOMAIN##/git/DivineEngine/Profiles/master/Clash/RuleSet/Guard/Privacy.yaml
    interval: 86400

  Hijacking:
    type: http
    behavior: classical
    path: ./RuleSet/Guard/Hijacking.yaml
    url: https://##DOMAIN##/git/DivineEngine/Profiles/master/Clash/RuleSet/Guard/Hijacking.yaml
    interval: 86400

  China:
    type: http
    behavior: classical
    path: ./RuleSet/China.yaml
    url: https://##DOMAIN##/git/DivineEngine/Profiles/master/Clash/RuleSet/China.yaml
    interval: 86400

rules:

  - RULE-SET,Unbreak,Final

  - RULE-SET,Streaming,Proxy
  - RULE-SET,Scholar,Proxy
  - RULE-SET,Telegram,Proxy
  - RULE-SET,Steam,Proxy
  - RULE-SET,Global,Proxy

  - RULE-SET,Advertising,Block
  - RULE-SET,Privacy,Block
  - RULE-SET,Hijacking,Block

  - RULE-SET,China,China

  # Local Area Network
  - IP-CIDR,192.168.0.0/16,DIRECT
  - IP-CIDR,10.0.0.0/8,DIRECT
  - IP-CIDR,172.16.0.0/12,DIRECT
  - IP-CIDR,127.0.0.0/8,DIRECT
  - IP-CIDR,100.64.0.0/10,DIRECT
  - IP-CIDR,224.0.0.0/4,DIRECT

  # Tencent
  - IP-CIDR,119.28.28.28/32,DIRECT
  - IP-CIDR,182.254.116.0/24,DIRECT
  # GeoIP China
  - GEOIP,CN,China

  - MATCH,Final
`

export default clash_fd_config_template
