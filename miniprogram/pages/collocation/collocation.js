// pages/collocation/collocation.js
const app = getApp()
const util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isAll:false,
    isPop:false,
    popTit:'',
    popItem: '',
    cartItmes: [],
    selectedItems: {},
    commitData: {
      name: '',
      phone: '',
      address: ''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCartList()
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
  getCartList() {
    var userId = wx.getStorageSync('userId')

    wx.cloud.callFunction({
      name: 'databaseOper',
      data: {
        collection: 'cart',
        type: 'get',
        where: {
          user_id: userId, pageSize: 30
        }
      }
    }).then(res => {
      this.setData({ cartItmes: res.result.data })
    })
  },
  onClickAll:function(){
    var flag = false;
    if(this.data.isAll){
      flag = false
    } else {
      flag = true
    }
    this.setData({
      isAll: flag
    })

    for (let i = 0; i < this.data.cartItmes.length; i++) {
      const key = 'cartItmes[' + i + '].checked'
      const val = this.data.cartItmes[i].checked
      this.setData({ [key]: flag })
    }
  },
  onClickPopOpen(e) {
    this.setData({
      isPop: true,
      popTit: e.target.dataset.val,
      popItem: e.target.dataset.item
    })
  },
  onClickPopClose() {
    this.setData({
      isPop: false
    })
  },
  /**
   * 点击删除
   */
  onClickDelete(e) {
    const id = e.currentTarget.dataset.id
    wx.cloud.callFunction({
      name: 'databaseOper',
      data: {
        collection: 'cart',
        type: 'delete',
        _id: id
      }
    }).then(res => {
      this.getCartList()
    })
  },
  /**
   * 选择物品-可能没用
   */
  onClickSel(e) {
    const id = e.currentTarget.dataset.id
    var flag = this.data.selectedItems[id]
    const key = 'selectedItems.'+id
    this.setData({
      [key]: !flag
    })
  },
  /**
   * 选择变更后触发
   */
  checkboxChange(e) {
    for (let i = 0; i < this.data.cartItmes.length; i++) {
      const key = 'cartItmes[' + i + '].checked'
      const isIn = util.isInArray(e.detail.value, this.data.cartItmes[i]._id)
      if (isIn) {
        this.setData({ [key]: true })
      } else {
        this.setData({ [key]: false })
      }
    }
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
   * 提交订单
   */
  onClickCommit() {
    const types = this.data.popItem
    const commitData = this.data.commitData
    const products = []

    // 获取所选物品
    this.data.cartItmes.forEach(element => {
      if (element.checked) {
        products.push(element)
      }
    })
    
    if (products.length === 0) {
      wx.showModal({
        title: '错误',
        content: '请先选择物品',
        showCancel: false,
        confirmText: '确定'
      })
    } else {
      util.orderCommit(commitData, products, types).then(res => {
        this.onClickPopClose()
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
  }
})