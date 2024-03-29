const surge_config_template = `
[General]
loglevel = warning
bypass-system = true
skip-proxy = 192.168.0.0/16, 10.0.0.0/8, 172.16.0.0/12,127.0.0.1,localhost,*.local
bypass-tun = 0.0.0.0/8, 1.0.0.0/9, 1.160.0.0/11, 1.192.0.0/11, 10.0.0.0/8, 14.0.0.0/11, 14.96.0.0/11, 14.128.0.0/11, 14.192.0.0/11, 27.0.0.0/10, 27.96.0.0/11, 27.128.0.0/9, 36.0.0.0/10, 36.96.0.0/11, 36.128.0.0/9, 39.0.0.0/11, 39.64.0.0/10, 39.128.0.0/10, 42.0.0.0/8, 43.224.0.0/11, 45.64.0.0/10, 47.64.0.0/10, 49.0.0.0/9, 49.128.0.0/11, 49.192.0.0/10, 54.192.0.0/11, 58.0.0.0/9, 58.128.0.0/11, 58.192.0.0/10, 59.32.0.0/11, 59.64.0.0/10, 59.128.0.0/9, 60.0.0.0/10, 60.160.0.0/11, 60.192.0.0/10, 61.0.0.0/10, 61.64.0.0/11, 61.128.0.0/10, 61.224.0.0/11, 100.64.0.0/10, 101.0.0.0/9, 101.128.0.0/11, 101.192.0.0/10, 103.0.0.0/10, 103.192.0.0/10, 106.0.0.0/9, 106.224.0.0/11, 110.0.0.0/7, 112.0.0.0/9, 112.128.0.0/11, 112.192.0.0/10, 113.0.0.0/9, 113.128.0.0/11, 113.192.0.0/10, 114.0.0.0/9, 114.128.0.0/11, 114.192.0.0/10, 115.0.0.0/8, 116.0.0.0/8, 117.0.0.0/9, 117.128.0.0/10, 118.0.0.0/11, 118.64.0.0/10, 118.128.0.0/9, 119.0.0.0/9, 119.128.0.0/10, 119.224.0.0/11, 120.0.0.0/10, 120.64.0.0/11, 120.128.0.0/11, 120.192.0.0/10, 121.0.0.0/9, 121.192.0.0/10, 122.0.0.0/7, 124.0.0.0/8, 125.0.0.0/9, 125.160.0.0/11, 125.192.0.0/10, 127.0.0.0/8, 139.0.0.0/11, 139.128.0.0/9, 140.64.0.0/11, 140.128.0.0/11, 140.192.0.0/10, 144.0.0.0/10, 144.96.0.0/11, 144.224.0.0/11, 150.0.0.0/11, 150.96.0.0/11, 150.128.0.0/11, 150.192.0.0/10, 152.96.0.0/11, 153.0.0.0/10, 153.96.0.0/11, 157.0.0.0/10, 157.96.0.0/11, 157.128.0.0/11, 157.224.0.0/11, 159.224.0.0/11, 161.192.0.0/11, 162.96.0.0/11, 163.0.0.0/10, 163.96.0.0/11, 163.128.0.0/10, 163.192.0.0/11, 166.96.0.0/11, 167.128.0.0/10, 167.192.0.0/11, 168.160.0.0/11, 169.254.0.0/16, 171.0.0.0/9, 171.192.0.0/11, 172.16.0.0/12, 175.0.0.0/9, 175.128.0.0/10, 180.64.0.0/10, 180.128.0.0/9, 182.0.0.0/8, 183.0.0.0/10, 183.64.0.0/11, 183.128.0.0/9, 192.0.0.0/24, 192.0.2.0/24, 192.88.99.0/24, 192.96.0.0/11, 192.160.0.0/11, 198.18.0.0/15, 198.51.100.0/24, 202.0.0.0/9, 202.128.0.0/10, 202.192.0.0/11, 203.0.0.0/9, 203.128.0.0/10, 203.192.0.0/11, 210.0.0.0/10, 210.64.0.0/11, 210.160.0.0/11, 210.192.0.0/11, 211.64.0.0/10, 211.128.0.0/10, 218.0.0.0/9, 218.160.0.0/11, 218.192.0.0/10, 219.64.0.0/11, 219.128.0.0/11, 219.192.0.0/10, 220.96.0.0/11, 220.128.0.0/9, 221.0.0.0/11, 221.96.0.0/11, 221.128.0.0/9, 222.0.0.0/8, 223.0.0.0/11, 223.64.0.0/10, 223.128.0.0/9, 103.47.210.236/32
proxy-settings-interface = Primary Interface (Auto)
ipv6 = true
replica = false
collapse-policy-group-items = true
use-default-policy-if-wifi-not-primary = true
allow-wifi-access = false
allow-udp-proxy = true
show-error-page-for-reject = false
exclude-simple-hostnames = true
http-listen = 0.0.0.0:8888
socks5-listen = 0.0.0.0:8889
proxy-test-url = http://www.google.com/generate_204
internet-test-url = http://www.google.cn/generate_204
test-timeout = 30
network-framework = false
wifi-assist = false
doh-server = https://223.5.5.5/dns-query
external-controller-access = tbxark@127.0.0.1:6170
include-all-networks = false
include-local-networks = false
http-api-web-dashboard = false
dns-server = 223.5.5.5, system

[Replica]
hide-apple-request = 1
hide-crashlytics-request = 1
hide-udp = 1
keyword-filter-type = none
keyword-filter = yunzhijia, 52toys
hide-crash-reporter-request = 0

[Proxy Group]
Proxy = select, Best, Select, Fallback, Balance, DIRECT
Best = url-test, policy-path=https://##DOMAIN##/policy?port=##PORT##&token=##TOKEN##&style=##STYLE##, update-interval=86400, url=http://www.google.com/generate_204
Select = select, policy-path=https://##DOMAIN##/policy?port=##PORT##&token=##TOKEN##&style=##STYLE##, update-interval=86400
Fallback = fallback, policy-path=https://##DOMAIN##/policy?port=##PORT##&token=##TOKEN##&style=##STYLE##, update-interval=86400, url=http://www.google.com/generate_204
Balance = load-balance, policy-path=https://##DOMAIN##/policy?port=##PORT##&token=##TOKEN##&style=##STYLE##, update-interval=86400, persistent=1
Block = select, REJECT-TINYGIF, REJECT, DIRECT, Final
China = select, DIRECT, Proxy
Final = select, DIRECT, Proxy

[Rule]
#
# > Rule set
# Unbreak 后续规则修正
RULE-SET,https://##DOMAIN##/git/DivineEngine/Profiles/master/Surge/Ruleset/Unbreak.list,Final
# Advertising 广告
RULE-SET,https://##DOMAIN##/git/DivineEngine/Profiles/master/Surge/Ruleset/Guard/Advertising.list,Block
DOMAIN-SET,https://##DOMAIN##/git/DivineEngine/Profiles/master/Surge/Ruleset/Guard/AdvertisingPlus.list,Block
# Privacy 隐私
RULE-SET,https://##DOMAIN##/git/DivineEngine/Profiles/master/Surge/Ruleset/Guard/Privacy.list,Block
# Hijacking 运营商劫持或恶意网站
RULE-SET,https://##DOMAIN##/git/DivineEngine/Profiles/master/Surge/Ruleset/Guard/Hijacking.list,Block
# Streaming 国际流媒体服务
RULE-SET,https://##DOMAIN##/git/DivineEngine/Profiles/master/Surge/Ruleset/StreamingMedia/Streaming.list,Proxy
# Global 全球加速
RULE-SET,https://##DOMAIN##/git/DivineEngine/Profiles/master/Surge/Ruleset/Global.list,Proxy
# Extra
RULE-SET,https://##DOMAIN##/git/DivineEngine/Profiles/master/Surge/Ruleset/Extra/Telegram/Telegram.list,Proxy
RULE-SET,https://##DOMAIN##/git/DivineEngine/Profiles/master/Surge/Ruleset/Extra/Game/Steam.list,Proxy
RULE-SET,https://##DOMAIN##/git/DivineEngine/Profiles/master/Surge/Ruleset/Extra/Apple/Apple.list,Proxy
# China 中国直连
RULE-SET,https://##DOMAIN##/git/DivineEngine/Profiles/master/Surge/Ruleset/China.list,China
RULE-SET,https://##DOMAIN##/git/DivineEngine/Profiles/master/Surge/Ruleset/StreamingMedia/StreamingCN.list,China
#
# > System
RULE-SET,SYSTEM,DIRECT
#
# > Local Area Network
RULE-SET,LAN,DIRECT
#
# > GeoIP China
GEOIP,CN,China
#
# > FINAL
FINAL,Final,dns-failed

[Host]
*.vpzcr.cn  = server:https://223.5.5.5/dns-query
*.mxrou.com = server:https://223.5.5.5/dns-query
*.bxapn.com = server:https://223.5.5.5/dns-query
`
export default surge_config_template
