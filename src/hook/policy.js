class HookPolicy {
  static async before(params) {
    // 可添加私有代码 比如返回固定文本
    return undefined
  }

  static async after(token, port, style, policy) {
    // 可添加私有代码 比如添加私有自定义
    return policy
  }
}

export default HookPolicy
