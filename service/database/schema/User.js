/**
 * 使用mongoose创建用户Schema
 * 
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema
// 声明Object类型
let ObjectId = Schema.Types.ObjectId
const bcrypt = require('bcrypt')
// 加盐强度
const SALT_WORK_FACTOR = 10

//创建用户Schema
const userSchema = new Schema({
  UserId: {type: ObjectId},
  userName: {unique: true, type: String},
  password: {type: String},
  createAt: {type: Date, default: Date.now()},
  lastLoginAt: {type: Date, default: Date.now()}
},{
    collection:'user'
})

//pre()是schema下的一个函数，每次存储数据前都会执行回调函数
userSchema.pre('save', function(next) {
  // 这里的this为什么指向新建的数据？猜测是因为在index.js中new出来了一个user对象，所以this指向了那个新建的对象？
  console.log(this)
  // 对密码进行加盐处理
  bcrypt.genSalt(SALT_WORK_FACTOR, (error,salt) => {
    if(error) return next(error)
    bcrypt.hash(this.password, salt, (error,hash) => {
      if(error) return next(error)
      this.password = hash
      next()
    }) 
  })
})

userSchema.methods = {
  // 密码比对，传一个客户端密码，再传一个数据库密码
  comparePassword (_password, password) {
    return new Promise((resolve, reject) => {
      // bcrypt自身就有比对方法，传两个参数和一个回调函数
      bcrypt.compare(_password, password, (err,isMatch) => {
        if (!err) resolve(isMatch)
        else reject(err)
      })
    })
  }
}

//发布模型
mongoose.model('User',userSchema)