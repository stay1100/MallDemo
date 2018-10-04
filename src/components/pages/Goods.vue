<template>
  <div>
    <div class="navbar-div">
      <van-nav-bar
        title="商品详情"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <div class="topimage-div">
      <img :src="goodsInfo.IMAGE1" width="100%"/>
    </div>
    <div class="goods-name">{{goodsInfo.NAME}}</div>
    <div class="goods-price">价格：{{goodsInfo.PRESENT_PRICE | moneyFilter}}</div>
    <div>
      <van-tabs swipeable sticky>
        <van-tab title="商品详情">
          <div class="detail" v-html="goodsInfo.DETAIL"></div>
        </van-tab>
        <van-tab title="评价">正在制作中</van-tab>
      </van-tabs>
    </div>
    <div class="goods-bottom">
      <div>
        <van-button size="large" type="primary" @click="addGoodsToCart">加入购物车</van-button>
      </div>
      <div>
        <van-button size="large" type="danger">直接购买</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import url from '@/serviceAPI.config.js'
import toMoney from '@/filters/moneyFilter.js'
export default {
  name: 'Goods',
  data () {
    return {
      goodsId: '',
      goodsInfo: {}
    }
  },
  created () {
    // 接收路由传递的参数
    this.goodsId= this.$route.query.goodsId ? this.$route.query.goodsId : this.$route.params.goodsId
    this.getInfo()
  },
  filters: {
    moneyFilter (money) {
      return toMoney(money)
    }
  },
  methods: {
    // 返回上一层
    onClickLeft(){
      this.$router.go(-1)
    },
    // 通过goodsId获取商品信息
    getInfo () {
      axios({
        url: url.getDetailGoodsInfo,
        method:'post',
        data:{
          goodsId:this.goodsId
        }
      })
      .then(res => {
        if (res.data.code == 200 && res.data.message ) {
          this.goodsInfo = res.data.message
        } else {
          this.$toast('服务器错误，数据取得失败')
        }
        console.log(this.goodsInfo)
      })
      .catch(error => {
        console.log(error)
      })
    },
    addGoodsToCart () {
    // 取出购物车内的商品数据
    let cartInfo = localStorage.cartInfo ? JSON.parse(localStorage.cartInfo) : []
    // 判断购物车内是否已经有这个商品，如果没有返回undeifnd，如果有返回第一个查找到的数据
    let isHaveGoods = cartInfo.find( cart => cart.goodsId == this.goodsId)
    console.log(isHaveGoods)
    if (!isHaveGoods) {
      // 没有商品直接添加到数组中
      // 重新组成添加到购物车的信息
      let newGoodsInfo={
        goodsId:this.goodsInfo.ID,
        Name:this.goodsInfo.NAME,
        price:this.goodsInfo.PRESENT_PRICE,
        image:this.goodsInfo.IMAGE1,
        count:1
      }
      cartInfo.push(newGoodsInfo) //添加到购物车
      localStorage.cartInfo = JSON.stringify(cartInfo) //操作本地数据
      this.$toast.success('添加成功')
    } else {
      this.$toast.success('已有此商品')
    }
    this.$router.push({name:'Cart'})  //进行跳转
    }
  }
}
</script>

<style lang="less" scoped>
.detail{
  // 后台传过来的数据中有空隙，暂时使用font-size来修改。
  font-size:0px;
}
.goods-name{
  background-color: #fff;
}
.goods-price{
  background-color: #fff;
}
.goods-bottom{
  position: fixed;
  bottom:0px;
  left:0px;
  background-color: #FFF;
  width:100%;
  display: flex;
  flex-direction: row;
  flex-flow: nowrap;
}
.goods-bottom > div{
  flex:1;
  padding:5px;
}
</style>