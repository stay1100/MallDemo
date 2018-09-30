const Koa = require('koa2')
const app = new Koa();
const { dbconnect, initSchemas } = require('./database/init.js')
const mongoose = require('mongoose')
const Router = require('koa-router')
const userRouter = require('./appApi/user.js')
const goodsRouter = require('./appApi/goods.js')
const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors')

// 注册koa-bodyparser，用于koa接受post数据
app.use(bodyParser())
// 解决跨域问题
app.use(cors())

const router = new Router()
// 装载所有子路由
router.use('/user', userRouter.routes())
router.use('/goods', goodsRouter.routes())
// 加载路由中间件
app.use(router.routes()).use(router.allowedMethods())

// 增加匿名执行函数，异步执行，等待所有代码装载完成后，连接数据库，然后初始化数据库模型
;(async () => {
  await dbconnect()
  initSchemas()
  // 测试：向数据库插入一条数据
  // const User = mongoose.model('User')
  // let oneUser = new User({userName:'jspang13',password:'123456'})
  // oneUser.save().then(()=>{console.log('插入成功')})
})()


app.use(async(ctx) => {
  ctx.body = '<h1>Koa2</h1>'
})
app.listen(3000, () => {
  console.log('[Server] starting at port 3000')
})
