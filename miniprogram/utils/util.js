/**
 * 时间格式化
 */
const db = wx.cloud.database()
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**
 * 判断字符串是否在列表中
 */
const isInArray = (arr, value) => {
  for (var i = 0; i < arr.length; i++) {
    if (value === arr[i]) {
      return true;
    }
  }
  return false;
}

/**
 * 获取分页数组，最多显示7个页码
 */
const pagination = (page, totalPage) => {
  const offset = totalPage - 7 < 1 ? 6 : 3
  const beginPage = page - offset < 1 ? 1 : page - offset
  const endPage = page + offset > totalPage ? totalPage : page + offset
  var pageArray = []
  for (let i = beginPage; i <= endPage; i++) {
    pageArray.push(i)
  }
  return pageArray
}

/**
 * 提交订单
 */
const orderCommit = (commitData, products, types, ) => {
  const userId = wx.getStorageSync('userId')
  const now = formatTime(new Date())

  // 验证手机号
  return new Promise((resolve, reject) => {
    if (commitData.name.length < 2) {
      reject('请正确填写姓名')
    } else if (!(/^1[3|4|5|7|8][0-9]\d{4,8}$/.test(commitData.phone))) {
      reject('请正确填写手机号')
    } else if (!userId) {
      reject('获取用户信息失败，请联系客服处理')
    } else {
      wx.cloud.callFunction({
        name: 'databaseOper',
        data: {
          collection: 'order',
          type: 'add',
          data: {
            order_id: '',
            status: 0,
            types: types.toString(),
            name: commitData.name,
            phone: commitData.phone,
            address: commitData.address,
            style: commitData.style,
            user_id: userId,
            updated: now,
            created: now,
            products: products
          }
        }
      }).then(res => {
        console.log('提交订单成功')
        resolve()
      }).catch(e => {
        console.log('提交订单失败', e)
        reject('提交订单失败，请联系管理员处理')
      })
    }
  })
}

const getCategoryList = type => {
  return db.collection('category').where({
    type: type
  }).limit(20).get()
}

const getStyleList = _id => {
  if (_id) {
    return db.collection('style').doc(_id).get()
  } else {
    return db.collection('style').limit(20).get()
  }
}

const cacheCategory = type => {
  db.collection('category').where({
    type: type
  }).limit(20).get().then(res => {
    wx.setStorageSync('categoryItems', res.data)
  })
}

const cacheStyle = () => {
  db.collection('style').limit(20).get().then(res => {
    wx.setStorageSync('styleItems', res.data)
  })
}

const cacheBanner = position => {
  wx.cloud.callFunction({
    name: 'databaseOper',
    data: {
      collection: 'banner',
      type: 'get',
      where: { page: 1, position: position, sort_order: 'order__asc' }
    }
  }).then(res => {
    const data = res.result.data
    const dataSymbol = (position == 0) ? 'bannerData1' : 'bannerData2'
    wx.setStorageSync(dataSymbol, data.slice(0, 6))
  })
}

const cacheDesigner = () => {
  wx.cloud.callFunction({
    name: 'databaseOper',
    data: {
      collection: 'designer',
      type: 'get',
      where: { page: 1 }
    }
  }).then(res => {
    const result = res.result
    const total = result.total > 16 ? 16 : result.total
    var designerList = []

    for (let i = 0; i < result.total; i = i + 4) {
      designerList.push({
        deslist: result.data.slice(i, i + 4)
      })
    }
    wx.setStorageSync('desData', designerList)
  })
}

module.exports = {
  formatTime: formatTime,
  isInArray: isInArray,
  pagination: pagination,
  orderCommit: orderCommit,
  getCategoryList: getCategoryList,
  getStyleList: getStyleList,
  cacheCategory: cacheCategory,
  cacheStyle: cacheStyle,
  cacheBanner: cacheBanner,
  cacheDesigner: cacheDesigner
}
