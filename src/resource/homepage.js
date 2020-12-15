const home_page_html = `<!DOCTYPE html>
<html>
  <head>
    <meta charset='UTF-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1'>
    <link href='https://cdn.bootcdn.net/ajax/libs/twitter-bootstrap/4.5.3/css/bootstrap.min.css' rel='stylesheet'>
    <title>Surge/Clash订阅</title>
    <style> .top-space { margin-top: 10px; } .help-block { font-size: small;} </style>
  </head>
  <body>
    <div style='margin: 50px;'>
      <h3>Surge/Clash订阅转换</h3>
        <div class='form-group top-space'>
          <label>订阅链接</label>
          <br>
          <input type='text' class='form-control' id='link'  placeholder='https://cdnapi.fyapi.net/index.php?...'>
          <p class='help-block top-space' id='link-error' style='display: none; color: red;' >ERRPR</p>
          <label class='top-space'>Surge订阅链接</label>
          <input type='text' class='form-control' id='surge-link'>
          <button class='btn btn-warning top-space' id='surge-btn'>复制</button>
          <br>
          <label class='top-space'>Clash pro订阅链接</label>
          <input type='text' class='form-control' id='clash-link'>
          <button class='btn btn-danger top-space' id='clash-btn' >复制</button>
        </div>
        <br>
        <div class='form-group'>
          <p class='help-block'>这是一个网络加速套餐订阅连接转换服务(暂时支持枫叶主机的ss/ssr/trojan套餐), 集成了DivineEngine/Profiles的规则。支持Surge, Clash配置暂时只支持专业版。</p>
          <p class='help-block'>本项目为开源项目，担心安全问题可以自行部署到cloudflare worker具体代码可以查看<a href='https://github.com/TBXark/proxy-config-worker'>https://github.com/TBXark/proxy-config-worker</a></p>
        </div>
    </div>
  </body>
  <script>
    const surgeLink = document.getElementById('surge-link')
    const clashLink = document.getElementById('clash-link')
    const linkError = document.getElementById('link-error')
    const mainHost = document.location.host
    document.getElementById('link').addEventListener('input', (e) => {
      try {
        const url = new URL(e.target.value)
        const port = url.searchParams.get('port')
        const authcode = url.searchParams.get('authcode')
        if (port && port.length > 0 && authcode && authcode.length > 0) {
          const surge = \`https://$\{mainHost}/config?port=$\{port}&token=$\{authcode}&style=surge\`
          const clash = \`https://$\{mainHost}/config?port=$\{port}&token=$\{authcode}&style=clash\`
          surgeLink.value = surge
          clashLink.value = clash
          linkError.style.display = 'none'
        } else {
          linkError.innerHTML = '链接格式错误'
          linkError.style.display = 'block'
        }
      } catch (e) {
        linkError.innerHTML = \`$\{e.name}: $\{e.message}\`
        linkError.style.display = 'block'
        console.error(e.message)
      }
    })
    document.getElementById('surge-btn').addEventListener('click', (e) => {
      surgeLink.select()
      if (document.execCommand('copy')) {
         alert('复制成功')
      }
    })
    document.getElementById('clash-btn').addEventListener('click', (e) => {
      clashLink.select()
      if (document.execCommand('copy')) {
          alert('复制成功')
      }
    })
  </script>
</html>`

export default home_page_html
