const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database({
  env: 'product-0yhcc'
})

/**
 * 集合增删改查操作
 */
exports.main = async (event, context) => {
  const cName = event.collection
  const type = event.type
  const id = event._id ? event._id : ''
  const data = event.data ? event.data : {}
  var res = {}

  if (type === 'doc') {
    return await db.collection(cName).doc(id).get()
  } else if (type === 'get') {
    var where = event.where ? event.where : {}
    var order = {}
    const page = where.page ? where.page : 1
    const pageSize = where.pageSize ? where.pageSize : 16
    const offset = (page - 1) * pageSize

    delete where.page
    delete where.pageSize

    const countResult = await db.collection(cName).where(where).count()
    const total = countResult.total
    const totalPage = Math.ceil(total / pageSize)

    Object.keys(where).forEach(key => {
      var value = where[key]
      if (typeof(value) == 'string') {
        var vls = value.split('__')
        if (vls.length == 2 && vls[0] == 'like') {
          where[key] = { '$regex': vls[1], '$options': 'i' }
        } else if (vls.length == 2 && vls[0] == 'order') {
          order['field'] = key
          order['order'] = vls[1]
          delete where[key]
        }
      }
    })
    console.log('>>> where', where)
    console.log('>>> order', order)

    if (order.field && order.order) {
      res = await db.collection(cName).where(where).orderBy(order.field, order.order).skip(offset).limit(pageSize).get()
    } else {
      res = await db.collection(cName).where(where).skip(offset).limit(pageSize).get()
    }
    return {
      data: res.data,
      page: page,
      pageSize: pageSize,
      total: total,
      totalPage: totalPage
    }
  } else if (type === 'add') {
    return await db.collection(cName).add({
      data: data
    })
  } else if (type === 'update') {
    return await db.collection(cName).doc(id).update({
      data: data
    })
  } else if (type === 'delete') {
    return await db.collection(cName).doc(id).remove()
  } else {
    return new Promise((resolve, reject) => {
      reject(new Error('type paramert is error'));
    })
  }
}
