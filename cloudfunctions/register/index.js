const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database({
  env: 'product-0yhcc'
})

/**
 * 保存用户信息
 */
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const user = await db.collection('user').where({
    openid: wxContext.OPENID
  }).get()

  if (user.data.length == 0) {
    console.log('>>> start register')
    return await db.collection('user').add({
      data: {
        avatarUrl: event.avatarUrl,
        nickName: event.nickName,
        gender: event.gender,
        city: event.city,
        country: event.country,
        language: event.language,
        province: event.province,
        openid: wxContext.OPENID,
        unionid: wxContext.UNIONID
      }
    })
  } else {
    console.log('>>> has registed')
    return user.data[0]
  }
}