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

module.exports = router