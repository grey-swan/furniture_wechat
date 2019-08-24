// pages/goods_list/goodslist.js
const util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    filter: {},
    isDown:false,
    isUp: false,
    type: 'style',
    typeId: '',
    page: 1,  // 当前页码
    totalPage: 1, // 总页码
    goodsItmes: [],
    ptItems: [],  // 普通分类
    spItems: []  // 饰品分类
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取商品列表
    this.data.type = options.type
    this.data.typeId = options.typeId

    var filter = { title: options.title, page: 1 }
    if (this.data.type === 'style') {
      filter['style_id'] = this.data.typeId
    } else {
      filter['category_id'] = this.data.typeId
    }
    this.data.filter = filter

    this.getGoodsList()
    this.getSpList()
    this.getPtList()
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
   * 获取饰品列表
   */
  getSpList() {
    util.getCategoryList('1').then(res => {
      this.setData({ spItems: res.data })
    })
  },
  /**
   * 获取普通列表
   */
  getPtList() {
    if (this.data.type == 'style') {
      // 风格搜索要获取物品分类
      util.getCategoryList('0').then(res => {
        this.setData({ ptItems: res.data })
      })
    } else {
      // 物品搜索要获取风格分类
      util.getStyleList().then(res => {
        this.setData({ ptItems: res.data })
      })
    }
  },
  /**
   * 获取商品列表
   */
  getGoodsList() {
    wx.cloud.callFunction({
      name: 'databaseOper',
      data: {
        collection: 'furniture',
        type: 'get',
        where: this.data.filter
      }
    }).then(res => {
      const result = res.result
      this.setData({ goodsItmes: result.data, page: result.page, totalPage: result.totalPage })
    })
  },
  onClickDown:function(){
    if(this.data.isDown){
      this.setData({
        isDown: false
      })
    }else{
      this.setData({
        isDown: true,
        isUp:false
      })      
    }
  },
  onClickUp: function () {
    if (this.data.isUp) {
      this.setData({
        isUp: false
      })
    } else {
      this.setData({
        isUp: true,
        isDown: false
      })
    }
  },
  onClickPrev: function () {
    if (this.data.page > 1) {
      const page = this.data.page - 1
      this.setData({ page: page, 'filter.page': page })
      this.getGoodsList()
    }
  },
  onClickNext: function () {
    if (this.data.page < this.data.totalPage) {
      const page = this.data.page + 1
      this.setData({ page: page, 'filter.page': page })
      this.getGoodsList()
    }
  },
  onFilterChange(e) {
    const id = e.currentTarget.dataset.id
    var filter = {}
    var type = e.currentTarget.dataset.type
    
    if (this.data.type) {
      filter['category_id'] = id
    } else {
      if (type == 'pt') {
        filter['style_id'] = id
      } else {
        filter['category_id'] = id
      }
    }
    this.data.filter = filter

    this.setData({ typeId: id })
    this.getGoodsList()
    
    if (type == 'pt') {
      this.onClickDown()
    } else {
      this.onClickUp()
    }
  }
})