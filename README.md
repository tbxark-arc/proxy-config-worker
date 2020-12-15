# Proxy config worker

An online proxy configuration adaptation tool for Cloudflare worker.

Demo: `https://proxy-config.tbxark.workers.dev`

Cloudflare worker Tutorials can be found [here](https://developers.cloudflare.com/workers/tutorials).

Further documentation for Wrangler can be found [here](https://developers.cloudflare.com/workers/tooling/wrangler).



## Installation

```bash
npm i @cloudflare/wrangler -g
mkdir your-worker-name
cd your-worker-name
wrangler init  your-worker-name --type webpack
npm init
npm install @tbxark/proxy-config-worker@1.0.2

```

## Configuration

Fill in the configuration in wrangler.toml

```toml
account_id = "your-account-id"
vars = { DOMAIN = "your-worker-name.your-name.workers.dev" }
```


## Example

```javascript
import Application from '@tbxark/proxy-config-worker/index'
import HookConfig from '@tbxark/proxy-config-worker/src/hook/config'

HookConfig.after = async (token, port, style, config) => {
  return config + '\n\n#Powered by tbxark'
}

addEventListener('fetch', event => {
  event.respondWith(Application.handleRequest(event.request))
})

addEventListener('scheduled', event => {
  event.waitUntil(Application.handleSchedule(event.scheduledTime))
})

```