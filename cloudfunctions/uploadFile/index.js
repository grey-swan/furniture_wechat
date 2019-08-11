// 云函数入口文件
const cloud = require('wx-server-sdk')
const fs = require('fs')
const path = require('path')

cloud.init({
  env: 'product-0yhcc'
})

exports.main = async (event, context) => {

  fs.createReadStream
  // const fileStream = fs.createReadStream(path.join(__dirname, 'demo.png'))
  return await cloud.uploadFile({
    cloudPath: event.path,
    fileContent: new Buffer(event.file, 'base64')
  })
}