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
    pageArray: [], // 分页列表
    goodsItmes: [],
    ptItems: [],  // 普通分类
    spItems: []  // 饰品分类
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取商品列表
    // type为style或category
    // typeId为style_id或category_id
    const type = options.type
    const typeId = options.typeId
    this.setData({ type: type, typeId: typeId })

    var filter = { title: options.title, page: 1 }
    if (type == 'style') {
      filter['style_id'] = typeId
    } else {
      filter['category_id'] = typeId
    }
    this.setData({ filter: filter })

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
  getGoodsList(top=false) {
    wx.cloud.callFunction({
      name: 'databaseOper',
      data: {
        collection: 'furniture',
        type: 'get',
        where: this.data.filter
      }
    }).then(res => {
      const result = res.result
      const pageArray = util.pagination(result.page, result.totalPage)
      this.setData({ goodsItmes: result.data, page: result.page, totalPage: result.totalPage, pageArray: pageArray })
      if (top) {
        wx.pageScrollTo({ scrollTop: 0, duration: 300 })
      }
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
      this.getGoodsList(true)
    }
  },
  onClickNext: function () {
    if (this.data.page < this.data.totalPage) {
      const page = this.data.page + 1
      this.setData({ page: page, 'filter.page': page })
      this.getGoodsList(true)
    }
  },
  onClickPage: function (e) {
    const page = e.currentTarget.dataset.page
    if (page != this.data.page) {
      this.setData({ page: page, 'filter.page': page })
      this.getGoodsList(true)
    }
  },
  onFilterChange(e) {
    const id = e.currentTarget.dataset.id
    var filter = { title: this.data.filter.title }
    var type = e.currentTarget.dataset.type
    
    if (this.data.type == 'style') {
      // 从当前风格中筛选物品
      this.setData({ 'filter.category_id': id })
    } else {
      if (type == 'pt') {
        // 从当前物品类中筛选风格
        this.setData({ 'filter.style_id': id })
      } else {
        // 因为饰品没有风格，所以
        this.setData({ 'filter.category_id': id })
      }
    }

    this.setData({ typeId: id })
    this.getGoodsList()
    
    if (type == 'pt') {
      this.onClickDown()
    } else {
      this.onClickUp()
    }
  }
})