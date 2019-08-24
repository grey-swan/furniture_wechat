// pages/designer_list/designerlist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    filter: {},
    designerItems: [],
    page: 1,  // 当前页码
    totalPage: 1 // 总页码
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
      this.setData({ designerItems: result.data, page: result.page, totalPage: result.totalPage })
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
})