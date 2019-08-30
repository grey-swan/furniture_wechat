// pages/designer_list/designerlist.js
const util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    filter: {},
    designerItems: [],
    page: 1,  // 当前页码
    totalPage: 1, // 总页码
    pageArray: [] // 分页列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.filter = { page: 1, title: options.title }
    this.getDesignerList()
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
   * 获取设计师列表
   */
  getDesignerList() {
    wx.cloud.callFunction({
      name: 'databaseOper',
      data: {
        collection: 'designer',
        type: 'get',
        where: this.data.filter
      }
    }).then(res => {
      const result = res.result
      const pageArray = util.pagination(result.page, result.totalPage)
      this.setData({ designerItems: result.data, page: result.page, totalPage: result.totalPage, pageArray: pageArray })
      wx.pageScrollTo({ scrollTop: 0, duration: 300 })
    })
  },
  onClickPrev: function () {
    if (this.data.page > 1) {
      const page = this.data.page - 1
      this.setData({ page: page, 'filter.page': page })
      this.getDesignerList()
    }
  },
  onClickNext: function () {
    if (this.data.page < this.data.totalPage) {
      const page = this.data.page + 1
      this.setData({ page: page, 'filter.page': page })
      this.getDesignerList()
    }
  },
  onClickPage: function (e) {
    const page = e.currentTarget.dataset.page
    if (page != this.data.page) {
      this.setData({ page: page, 'filter.page': page })
      this.getGoodsList()
    }
  }
})