// pages/prodea/prodea.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    isShow: false,
    isAll: false,
    isPop: false,
    itemDetail: {},
    currentSwiper4: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const _id = options._id
    const db = wx.cloud.database()

    db.collection('furniture').doc(_id).get().then(res => {
      this.setData({ itemDetail: res.data })
    })
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

  },
  swiperChange4: function (e) {
    this.setData({
      currentSwiper4: e.detail.current
    })
  },  
  onClickPop: function(){
    this.setData({
      isPop:true
    })       
  },
  onClickPopOpen(e) {
    this.setData({
      isPop: true,
      popTit: e.target.dataset.val
    })
    console.log(this.data.popTit);
  },
  onClickPopClose() {
    this.setData({
      isPop: false
    })
  },
  /**
   * 添加到搭配间
   */
  onClickPopShow() {
    var that = this;
    const userId = wx.getStorageSync('userId')

    if (userId) {
      const db = wx.cloud.database()

      db.collection('cart').where({
        user_id: userId,
        product_id: that.data.itemDetail._id
      }).count().then(res2 => {
        console.log('res2', res2)
        if (res2.total == 0) {
          return wx.cloud.callFunction({
            name: 'databaseOper',
            data: {
              collection: 'cart',
              type: 'add',
              data: {
                user_id: res.data,
                title: that.data.itemDetail.title,
                product_id: that.data.itemDetail._id,
                img: that.data.itemDetail.img[0],
                style_id: that.data.itemDetail.style_id,
                price: that.data.itemDetail.price,
                checked: false
              }
            }
          })
        }
      }).then(res => {
        that.setData({
          isShow: true
        })
        setTimeout(function () {
          that.setData({ isShow: false })
        }, 1500)
      })
    } else {
      that.setData({
        isShow: true
      })
      setTimeout(function () {
        that.setData({ isShow: false })
      }, 1500)
    }
  }
})