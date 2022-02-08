import Policy from './src/router/policy'
import Git from './src/router/git'
import Config from './src/router/config'
import HookSchedule from './src/hook/schedule'
import home_page_html from './src/resource/homepage'
import { Router } from 'itty-router'

class Application {
  static async handleSchedule(scheduledTime) {
    return await HookSchedule.handle(scheduledTime)
  }
  static  handleRequest(request) {
    const router = Router()
    router.get('/policy', async request => {
      let url = new URL(request.url)
      return await Policy.handleRequestWithParams(url.searchParams)
    })

    router.get('/config', async request => {
      let url = new URL(request.url)
      return await Config.handleRequestWithParams(url.searchParams)
    })

    router.get('/git/*', async request => {
      let url = new URL(request.url)
      url.pathname = url.pathname.replace(new RegExp('^/git'), '')
      const redirectReq = new Request(url, request)
      return await Git.handleRequest(redirectReq)
    })

    router.all('*', async request => {
      return new Response(home_page_html, {
        headers: { 'content-type': 'text/html;charset=UTF-8' },
      })
    })
    return router.handle(request)
  }
}

export default Application
