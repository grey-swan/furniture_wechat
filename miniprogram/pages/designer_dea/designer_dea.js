// pages/designer_dea/designer_dea.js
const util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    commitData: {
      name: '',
      phone: '',
      address: ''
    },
    isPop: false,
    itemDetail: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const _id = options._id
    const db = wx.cloud.database()

    db.collection('designer').doc(_id).get().then(res => {
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
    const products = [this.data.itemDetail]
    const types = 3

    util.orderCommit(commitData, products, types).then(res => {
      this.onClickPopClose()
      wx.showModal({
        title: '预约成功',
        content: '我们将会尽快联系您，请您保持电话畅通',
        showCancel: false,
        confirmText: '确定'
      })
    }).catch(err => {
      wx.showModal({
        title: '错误',
        content: err,
        showCancel: false,
        confirmText: '确定'
      })
    })
  }
})