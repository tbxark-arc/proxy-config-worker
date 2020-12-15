import Policy from './src/router/policy'
import Git from './src/router/git'
import Config from './src/router/config'
import HookSchedule from './src/hook/schedule'
import home_page_html from './src/resource/homepage'

class Application {
  static async handleSchedule(scheduledTime) {
    return await HookSchedule.handle(scheduledTime)
  }
  static async handleRequest(request) {
    try {
      let url = new URL(request.url)
      const action = url.pathname.split('/')[
        url.pathname.startsWith('/') ? 1 : 0
      ]

      switch (action) {
        case 'policy':
          return await Policy.handleRequestWithParams(url.searchParams)
        case 'config':
          return await Config.handleRequestWithParams(url.searchParams)
        case 'git':
          url.pathname = url.pathname.replace(`/${action}`, '')
          const redirectReq = new Request(url.href, request)
          return await Git.handleRequest(redirectReq)
        default:
          return new Response(home_page_html, {
            headers: { 'content-type': 'text/html;charset=UTF-8' },
          })
      }
    } catch (e) {
      return new Response(JSON.stringify({ error: e.message }), { status: 500 })
    }
  }
}

export default Application
