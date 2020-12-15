import Application from './main'

addEventListener('fetch', event => {
  event.respondWith(Application.handleRequest(event.request))
})

addEventListener('scheduled', event => {
  event.waitUntil(Application.handleSchedule(event.scheduledTime))
})
