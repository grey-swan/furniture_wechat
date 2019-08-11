//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    bannerData1: [],
    bannerData2: [],
    designerItems: [],
    designerPage: 1,
    designerTotalPage: 1,
    desData:[] ,
    currentSwiper: 0,
    currentSwiper2: 0,
    currentSwiper3: 0,
    height:0,
    height2: 0,
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: true,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    app.authForbidCallBack = res => {
      this.setData({ hasUserInfo: false })
    }
    app.userInfoReadyCallback = res => {
      this.setData({ hasUserInfo: true })
    }
  },
  onShow: function () {
    this.getBannerList(0)
    this.getBannerList(1)
    this.getDesignerList()
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
    // console.log(scale);
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
  },
  /**
   * 获取设计师列表
   */
  getDesignerList() {
    wx.cloud.callFunction({
      name: 'databaseOper',
      data: {
        collection: 'designer',
        type: 'get',
        page: this.data.page
      }
    }).then(res => {
      const result = res.result
      const total = result.total > 16 ? 16 : result.total
      var designerList = []
      
      for (let i = 0; i < result.total; i = i + 4) {
        designerList.push({
          deslist: result.data.slice(i, i + 4)
        })
      }
      this.setData({ desData: designerList })
    })
  },
  /**
   * 获取广告位列表
   */
  getBannerList(position) {
    const dataSymbol = (position == 0) ? 'bannerData1' : 'bannerData2'
    
    wx.cloud.callFunction({
      name: 'databaseOper',
      data: {
        collection: 'banner',
        type: 'get',
        page: this.data.page,
        where: { position: position, sort_order: 'order__asc' }
      }
    }).then(res => {
      const data = res.result.data
      this.setData({ [dataSymbol]: data.slice(0, 6) })
      console.log('data', dataSymbol, data)
    })
  }
})
