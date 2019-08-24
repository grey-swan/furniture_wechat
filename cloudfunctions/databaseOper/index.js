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
    var filter = event.where ? event.where : {}
    var order = {}
    const page = filter.page ? parseInt(filter.page) : 1
    const pageSize = filter.pageSize ? filter.pageSize : 16
    const offset = (page - 1) * pageSize

    console.log('>>> filter', filter)
    delete filter.page
    delete filter.pageSize

    Object.keys(filter).forEach(key => {
      var value = filter[key]
      if (typeof(value) == 'string') {
        var vls = value.split('__')
        if (vls.length == 2 && vls[0] == 'like') {
          filter[key] = { '$regex': vls[1], '$options': 'i' }
        } else if (vls.length == 2 && vls[0] == 'order') {
          order['field'] = key
          order['order'] = vls[1]
          delete filter[key]
        }
      }
    })
    const countRes = await db.collection(cName).where(filter).count()
    const total = countRes.total
    const totalPage = Math.ceil(total / pageSize)

    console.log('>>> where', filter)
    console.log('>>> order', order)

    if (order.field && order.order) {
      res = await db.collection(cName).where(filter).orderBy(order.field, order.order).skip(offset).limit(pageSize).get()
    } else {
      res = await db.collection(cName).where(filter).skip(offset).limit(pageSize).get()
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
