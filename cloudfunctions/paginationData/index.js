// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  var dbName = event.dbName
  var filter = event.filter? event.filter: null
  var page = event.page? event.page: 1
  var pageSize = event.pageSize? event.pageSize: 20

  const countResult = await db.collection(dbName).where(filter).count()
  const total = countResult.total
  const totalPage = Math.ceil(total / pageSize)

  var res = await db.collection(dbName).where(filter).skip((page - 1) * pageSize).limit(pageSize).get()
  return {
    data: res.data,
    page: page,
    pageSize: pageSize,
    total: total,
    totalPage: totalPage
  }
}