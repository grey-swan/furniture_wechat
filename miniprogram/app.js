//app.js
App({
  onLaunch: function () {
    wx.cloud.init({
      // env: 'test-xtx3m',
      env: 'product-0yhcc',
      traceUser: true
    })

    // 展示本地存储能力
    var userId = wx.getStorageSync('userId')

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo'] && userId) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              console.log('get userInfo success', res.userInfo)
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            },
            fail: res => {
              console.log('get userInfo fail')
            }
          })
        } else {
          this.authForbidCallBack()
        }
      }
    })
  },
  onShow: function () {
    const util = require('/utils/util.js')

    // 获取banner1列表
    util.cacheBanner(0)
    // 获取banner2列表
    util.cacheBanner(1)
    // 获取风格列表
    util.cacheStyle()
    // 获取分类列表
    util.cacheCategory()
    // 缓存设计师
    util.cacheDesigner()
  },
  globalData: {
    userInfo: null
  }
})