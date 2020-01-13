// pages/experience/experience.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 得胜
    latitudeDs: 25.055060,
    longitudeDs: 102.745150,
    markersDs: [{
      iconPath: '../../images/icon/markers.svg',
      latitude: 25.055060,
      longitude: 102.745150,
      name: '华韵亿美'
    }],
    // 红星
    latitudeHx: 24.994446,
    longitudeHx: 102.683608,
    markersHx: [{
      iconPath: '../../images/icon/markers.svg',
      latitude: 24.994446,
      longitude: 102.683608,
      name: '华韵亿美'
    }],
    covers: [],
    polygons: [],
    enable3d: false,
    showCompass: true,
    enableOverlooking: false,
    enableZoom: true,
    enableScroll: true,
    enableRotate: false,
    drawPolygon: false,
    enableSatellite: false,
    enableTraffic: false,
    aboutUrl: "http://hyym.oocpo.com/f3433a06d92811e98ad35254008e9dc2.jpg?ran=" + Math.random()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})