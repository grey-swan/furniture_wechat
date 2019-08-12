/**
 * 时间格式化
 */
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
            types: parseInt(types),
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
  const db = wx.cloud.database()

  return db.collection('category').where({
    type: type
  }).limit(100).get()
}

const getStyleList = _id => {
  const db = wx.cloud.database()

  if (_id) {
    return db.collection('style').doc(_id).get()
  } else {
    return db.collection('style').limit(100).get()
  }
}

module.exports = {
  formatTime: formatTime,
  isInArray: isInArray,
  orderCommit: orderCommit,
  getCategoryList: getCategoryList,
  getStyleList: getStyleList
}
