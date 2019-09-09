// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchText: '',
    type: '',
    styleId: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ type: options.type, styleId: options.style_id })
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
   * 绑定输入
   */
  bindKeyInput: function (e) {
    this.setData({
      searchText: e.detail.value
    })
  },
  /**
   * 点击搜索按钮
   */
  onClickSearch: function () {
    if (this.data.type == 'goods') {
      var url = '/pages/goods_list/goodslist?title=like__' + this.data.searchText
      if (this.data.styleId) {
        url += '&type=style&typeId=' + this.data.styleId
      }
      wx.navigateTo({
        url: url,
      })
    } else if (this.data.type == 'designer') {
      wx.navigateTo({
        url: '/pages/designer_list/designerlist?title=like__' + this.data.searchText,
      })
    } else if (this.data.type == 'case') {
      wx.navigateTo({
        url: '/pages/case_list/case_list?title=like__' + this.data.searchText,
      })
    }
  }
})