class HookConfig {
  static before(params) {
    // 可添加私有代码 比如返回配置信息
    return undefined
  }

  static after(token, port, style, config) {
    // 可添加私有代码 自定义配置信息
    return config
  }
}

export default HookConfig
