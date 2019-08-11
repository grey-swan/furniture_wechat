// pages/case_deatils/casedea.js
const util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    itemDetail: {},
    commitData: {
      name: '',
      phone: '',
      address: ''
    },
    isPop: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const _id = options._id
    wx.cloud.callFunction({
      name: 'databaseOper',
      data: {
        collection: 'case',
        type: 'doc',
        _id: _id
      }
    }).then(res => {
      this.setData({ itemDetail: res.result.data })
      return wx.cloud.callFunction({
        name: 'databaseOper',
        data: {
          collection: 'style',
          type: 'doc',
          _id: res.result.data.style_id
        }
      })
    }).then(res => {
      this.setData({ 'itemDetail.styleTitle': res.result.data.title })
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
  /**
    * 提交信息时，输入框内容变更时触发
    */
  inputChange(e) {
    const item = e.currentTarget.dataset.item
    const value = e.detail.value
    const key = 'commitData.' + item
    this.setData({
      [key]: value
    })
  },
  onClickPopOpen(e) {
    this.setData({
      isPop: true
    })
  },
  onClickPopClose() {
    this.setData({
      isPop: false
    })
  },
  /**
   * 提交我想这样搭
   */
  onClickCommit: function () {
    const commitData = this.data.commitData
    const userId = wx.getStorageSync('userId')
    const now = util.formatTime(new Date())
    const products = [this.data.itemDetail]

    if (userId) {
      wx.cloud.callFunction({
        name: 'databaseOper',
        data: {
          collection: 'order',
          type: 'add',
          data: {
            order_id: '',
            status: 0,
            types: 2,
            name: commitData.name,
            phone: commitData.phone,
            address: commitData.address,
            user_id: userId,
            updated: now,
            created: now,
            products: products
          }
        }
      }).then(res => {
        this.onClickPopClose()
        wx.showModal({
          title: '预定成功',
          content: '我们将会尽快联系您，请您保持电话畅通',
          showCancel: false,
          confirmText: '确定'
        })
      })
    }
  }
})