/**
 * user接口文件
 */

const Router = require('koa-router')
const mongoose = require('mongoose')


const router = new Router()

router.get('/', async(ctx) => {
  ctx.body = '这是用户操作首页'
})
router.post('/register',async(ctx)=>{
    // 取得modle
    const User = mongoose.model('User')
    // 把从前端接收到的数据封装成User对象
    const newUser = new User(ctx.request.body)
    await newUser.save().then(() => {
      ctx.body = {
        code: 200,
        message: '注册成功'
      }
    }).catch(error => {
      ctx.body = {
        code: 500,
        message: error
      }
    })
})
router.post('/login', async(ctx) => {
  // 获取前端传入的密码
  const loginUser = ctx.request.body
  const userName = loginUser.userName
  const password = loginUser.password
  // 引入User的model
  const User = mongoose.model('User')
  //查找用户名是否存在，如果存在就继续比对密码
  await User.findOne({userName: userName}).exec().then(async result => {
    // 当用户名存在时，开始比对密码
    if (result) {
      let newUser = new User()
      await newUser.comparePassword(password, result.password)
      .then(isMatch => {
        ctx.body={ code:200, message: isMatch}
      })
      .catch(error => {
        ctx.body={ code:404, message:'密码错误'}
      })
    } else {
      ctx.body = { code:404, message:'用户名不存在'}
    }
  }).catch(error => {
    ctx.body = {code: 500, message: error}
  })
})

module.exports = router
