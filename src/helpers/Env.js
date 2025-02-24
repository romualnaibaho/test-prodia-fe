module.exports = function () {
    this.getEnv = function (param) {
      if (param === 'API_URL') {
        return process.env.VUE_APP_API_URL
      }
      if (param === 'BASE_URL') {
        return process.env.VUE_APP_BASE_URL
      }
      if (param === 'API_GATEWAY_URL') {
        return process.env.VUE_APP_API_GATEWAY_URL
      }
      return ''
    }
  }