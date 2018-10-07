/**
 * 初始化数据库连接
 */
const mongoose = require('mongoose')
// 数据库路径
// localhost后面跟的是数据库名称，这是固定写法。这里因为是使用了默认端口27017，所以不需要重写端口号
const db = "mongodb://localhost/mall-db"
// const db = "mongodb://xk:123456@$80.240.30.22:27017/mall?authSource=admin"
// node的glob模块，使用glob规则可以获取匹配对应规则文件。
const glob = require('glob')
// resolve用于将一系列路径或路径段解析为绝对路径
const {resolve} = require('path')

// 一次性引入所有的schema文件
exports.initSchemas = () => {
  glob.sync(resolve(__dirname, './schema/', '**/*.js')).forEach(require)
}

// 连接数据库
exports.dbconnect = () => {
  mongoose.connect(db)
  // 返回一个Promise对象，对数据库的一些特殊情况做出判断
  return new Promise((resolve,reject) => {
    // 限制重连次数，避免无限重连
    let maxConnectTimes = 0;
    // 增加数据库的监听事件
    mongoose.connection.on('disconnected', () => {
      if (maxConnectTimes < 3) {
        maxConnectTimes++
        console.log('***********数据库断开***********')
        mongoose.connect(db)
      } else {
        // 返回异常
        reject()
        // 抛出错误（服务端抛出异常）
        throw new Error('数据库出现异常，请稍后再试')
      }
    })
    mongoose.connection.on('error', (err) => {
      if (maxConnectTimes < 3) {
        maxConnectTimes++
        console.log('***********数据库错误***********')
        mongoose.connect(db)
      } else {
        // 返回异常
        reject(err)
        // 抛出错误（服务端抛出异常）
        throw new Error('数据库出现异常，请稍后再试')
      }
    })
    // 数据库连接成功时
    mongoose.connection.once('open', () => {
      console.log('数据库连接成功')
      resolve()
    })
  })
}