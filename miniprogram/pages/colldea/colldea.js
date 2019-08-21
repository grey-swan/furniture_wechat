// pages/colldea/colldea.js
const util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectShow: false,//控制下拉列表的显示隐藏，false隐藏、true显示
    selectData: [],//下拉列表的数据
    index: 0,//选择的下拉列表下标
    itemDetail: {},
    commitData: {
      name: '',
      phone: '',
      address: '',
      style: ''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getItemDetail()
    this.getStyleList()
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
  getItemDetail() {
    const db = wx.cloud.database()

    db.collection('soft').get().then(res => {
      if (res.data.length > 0) {
        this.setData({ itemDetail: res.data[0] })
      }
    })
  },
  getStyleList() {
    util.getStyleList().then(res => {
      this.setData({ selectData: res.data })
    })
  },
  // 点击下拉显示框
  selectTap() {
    this.setData({
      selectShow: !this.data.selectShow
    });
  },
  // 点击下拉列表
  optionTap(e) {
    let Index = e.currentTarget.dataset.index;//获取点击的下拉列表的下标
    let key = 'commitData.style'
    let val = this.data.selectData[Index].title
    this.setData({
      index: Index,
      selectShow: !this.data.selectShow,
      [key]: val
    })
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
  /**
   * 提交全屋软装搭配
   */
  onClickCommit: function () {
    const commitData = this.data.commitData
    const products = [this.data.itemDetail]
    const types = 0

    util.orderCommit(commitData, products, types).then(res => {
      wx.showModal({
        title: '预定成功',
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