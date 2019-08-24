//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    bannerData1: [],
    bannerData2: [],
    designerPage: 1,
    designerTotalPage: 1,
    desData:[] ,
    currentSwiper: 0,
    currentSwiper2: 0,
    currentSwiper3: 0,
    height:0,
    height2: 0,
    userInfo: {},
    hasUserInfo: true
  },
  onLoad: function () {
    app.authForbidCallBack = res => {
      this.setData({ hasUserInfo: false })
    }
    app.userInfoReadyCallback = res => {
      this.setData({ hasUserInfo: true })
    }
    app.cacheCallback = res => {
      this.setData({ bannerData1: wx.getStorageSync('bannerData1') })
      this.setData({ bannerData2: wx.getStorageSync('bannerData2') })
      this.setData({ desData: wx.getStorageSync('desData') })
    }
    
  },
  onShow: function () {
    this.setData({ bannerData1: wx.getStorageSync('bannerData1') })
    this.setData({ bannerData2: wx.getStorageSync('bannerData2') })
    this.setData({ desData: wx.getStorageSync('desData') })
  },
  bindGetUserInfo: function (e) {
    var that = this
    wx.getSetting({
      success: res => {
        // 再次获取用户是否同意
        if (res.authSetting['scope.userInfo']) {
          // 注册
          wx.cloud.callFunction({
            name: "register",
            data: e.detail.userInfo,
            success: res => {
              app.globalData.userInfo = e.detail.userInfo
              that.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
              })

              console.log("注册成功", res)
              wx.setStorageSync('userId', res.result._id)
            }
          })
        } else {
          console.log('user forbid')
        }
      }
    })
  },
  setConHeight:function(e){
    var imgWidth = e.detail.width;
    var imgHeight = e.detail.height;
    var sysInfo = wx.getSystemInfoSync();
    var screeWidth = sysInfo.screenWidth;
    var scale = screeWidth / imgWidth;
    
    this.setData({
      height: imgHeight * scale
    })
  },
  swiperChange: function (e) {
    this.setData({
      currentSwiper: e.detail.current
    })
  },
  setConHeight2: function (e) {
    var imgWidth = e.detail.width;
    var imgHeight = e.detail.height;
    var sysInfo = wx.getSystemInfoSync();
    var screeWidth = sysInfo.screenWidth;
    var scale = screeWidth / imgWidth;

    this.setData({
      height2: imgHeight * scale
    })
  },
  swiperChange2: function (e) {
    this.setData({
      currentSwiper2: e.detail.current
    })
  },
  swiperChange3: function (e) {
    this.setData({
      currentSwiper3: e.detail.current
    })
  }
})
