import Application from '@tbxark/proxy-config-worker/index'
import HookConfig from '@tbxark/proxy-config-worker/src/hook/config'

async function afterHookConfig(token, port, style, config) {
  return config + '\n\n#Powered by tbxark'
}

HookConfig.after = afterHookConfig

addEventListener('fetch', event => {
  event.respondWith(Application.handleRequest(event.request))
})

addEventListener('scheduled', event => {
  event.waitUntil(Application.handleSchedule(event.scheduledTime))
})
