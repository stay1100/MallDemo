/**
 * 增加关于商品信息的各种路由接口
 */

const Router = require('koa-router')
const mongoose = require('mongoose')
const fs = require('fs')
const router = new Router()

router.get('/insertAllGoodsInfo', async ctx => {
  ctx.body = '开始导入数据'
  // 将newGoods中的数据插入数据库
  // 这里的路径是相对于index.js的
  fs.readFile('./data_json/newGoods.json', 'utf8', (err, data) => {
    // 把data数据转换成js能处理的JSON对象形式
    data = JSON.parse(data)
    let saveCount = 0
    const Goods = mongoose.model('Goods')
    data.map((value, index) => {
      const newGoods = new Goods(value)
      newGoods.save()
      .then(() => {
        saveCount++
        console.log(`数据导入成功，共导入${saveCount}条`)
      })
      .catch(error => {
        console.log(error)
      })
    })
  })
})

router.get('/insertAllCategory', async ctx => {
  ctx.body = '开始导入Category数据'
  fs.readFile('./data_json/category.json', 'utf8', (error, data) => {
    data = JSON.parse(data)
    let saveCount = 0
    const Category = mongoose.model('Category')
    data.RECORDS.map((value, index) => {
      const newCategory = new Category(value)
      newCategory.save().then(() => {
        saveCount++
        console.log(`数据导入成功，共导入${saveCount}条`)
      }).catch(error => {
        console.log(error)
      })
    })
  })
})

router.get('/insertAllCategorySub', async ctx => {
  ctx.body = '开始导入CategorySub数据'
  fs.readFile('./data_json/categorySub.json', 'utf8', (error, data) => {
    data = JSON.parse(data)
    let saveCount = 0
    const CategorySub = mongoose.model('CategorySub')
    data.RECORDS.map((value,index) => {
      const newCategorySub = new CategorySub(value)
      newCategorySub.save().then(() => {
        saveCount++
        console.log(`数据导入成功，共导入${saveCount}条`)
      }).catch(error => {
        console.log(error)
      })
    })
  })
})

// 获取商品详情信息
router.post('/getDetailGoodsInfo', async ctx => {
  let goodsId = ctx.request.body.goodsId
  const Goods = mongoose.model('Goods')
  await Goods.findOne({ID: goodsId}).exec()
  .then(result => {
    ctx.body = {code:200, message: result}
  })
  .catch(error => {
    console.log(error)
    ctx.body = {code:500, message:error}
  })
})

// 获取商品分类信息
router.get('/getCategoryList',async ctx => {
  try{
    const Category = mongoose.model('Category')
    let result = await Category.find().exec()
    ctx.body={code:200,message:result}
  } catch(err) {
    ctx.body={code:500,message:err}
  }
})

// 获取商品子类信息
router.post('/getCategorySubList',async(ctx)=>{
  try{
    let categoryId = ctx.request.body.categoryId
    const CategorySub = mongoose.model('CategorySub')
    let result = await CategorySub.find({MALL_CATEGORY_ID:categoryId}).exec()
    ctx.body={code:200,message:result}
  }catch(err){
    ctx.body={code:500,message:err}
  }
})

// 根据商品类别获取商品列表
router.post('/getGoodsListByCategorySubID',async(ctx)=>{
  try{
    // let categorySubId = "2c9f6c94621970a801626a3770620177"
    // let page = 2;
    let categorySubId = ctx.request.body.categorySubId
    // 添加分页功能，这样传回前台的数据就能直接分页显示
    let page = ctx.request.body.page
    let num = 10 //每页显示数量
    let start = (page-1)*num

    const Goods = mongoose.model('Goods')
    // 分页后添加.skip(start) .limit(num)
    let result = await Goods.find({SUB_ID:categorySubId}).skip(start).limit(num).exec()
    ctx.body={code:200,message:result}
  }catch(err){
    ctx.body={code:500,message:err}
  }
})

module.exports = router