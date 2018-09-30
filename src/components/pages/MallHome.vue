<template>
  <div>
    <!--search bar area-->
    <van-row class="search-bar">
      <van-col span="3">
        <img class="location-icon" :src="locationIcon">
      </van-col>
      <van-col span="16">
        <input type="text" placeholder="查找" class="header-search">  
      </van-col>
      <van-col span="5">
        <van-button size="mini">查找</van-button>
      </van-col>
    </van-row>
    <!-- swiper area -->
    <div class="swiper">
      <van-swipe :autoplay="3000">
        <van-swipe-item
          v-for="(item, index) of bannerPicArray"
          :key="index">
            <img v-lazy="item.image">
          </van-swipe-item>
      </van-swipe>
    </div>
    <!-- typebar area -->
    <div class="type-bar">
      <div v-for="(cate,index) in category" :key="index">
        <img v-lazy="cate.image" width="90%">
        <span>{{cate.mallCategoryName}}</span>
      </div>
    </div>
    <!-- adbanner area -->
    <div class="ad-banner">
      <img v-lazy="adBanner">
    </div>
    <!-- recommend goods area -->
    <div class="recommend-area">
      <p class="recommend-title">商品推荐</p>
      <div class="recommend-body">
        <swiper :options="swiperOption">
          <swiperSlide
            v-for="(item,index) of recommendGoods"
            :key="index">
            <div class="goods-item">
              <img :src="item.image" width="80%" />
              <p>{{item.goodsName}}</p>
              <p>￥{{item.price | moneyFilter()}} (￥{{item.mallPrice | moneyFilter}})</p>
            </div>
          </swiperSlide>
        </swiper>
      </div>
    </div>
    <!-- floor one area -->
    <floor-component :floorTitle="floorName.floor1" :floorData="floor1"></floor-component>
    <floor-component :floorTitle="floorName.floor2" :floorData="floor2"></floor-component>
    <floor-component :floorTitle="floorName.floor3" :floorData="floor3"></floor-component>
    <!-- hot area -->
    <div class="hot-area">
      <div class="hot-title">热卖商品</div>
      <div class="hot-goods">
        <!-- 这里需要一个list组件 -->
        <van-list  gutter="20">
          <van-row>
            <van-col span="12" v-for="(item,index) in hotGoods" :key="index">
              <goods-info :goodsImage="item.image" :goodsName="item.name" :goodsPrice="item.price" :goodsId="item.goodsId"></goods-info>
            </van-col>
          </van-row>
        </van-list>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import 'swiper/dist/css/swiper.css'
import {swiper, swiperSlide} from 'vue-awesome-swiper'
import floorComponent from '@/components/Common/floorComponent'
import toMoney from '@/filters/moneyFilter.js'
import goodsInfo from '@/components/Common/goodsInfoComponent'
import axiosUrl from '@/serviceAPI.config.js'

export default {
  name: 'MallHome',
  components: {
    swiper,
    swiperSlide,
    floorComponent,
    goodsInfo
  },
  data () {
    return {
      swiperOption: {
        slidesPerView: 3
      },
      locationIcon: require('@/assets/imgs/location.png'),
      bannerPicArray:[],
      category: [],
      adBanner: '',
      recommendGoods: [],
      floorName: [],
      floor1: [],
      floor2: [],
      floor3: [],
      hotGoods:[]
    }
  },
  filters: {
    moneyFilter (money) {
      return toMoney(money)
    }
  },
  methods: {
    /**
     * 
     * srcPickup()用于提取axios数据组中的特定value到数组
     * @param {array} [arr] [axios接收到的数据组]
     * @param {string} [key] [要提取的value值的key]
     * @return {array} [返回包含提取到的各个value的数组]
     * 
     */
    srcPickup (arr, key) {
      let temp = []
      arr.forEach((currentValue) => {
        // 注意这里的key是动态的数据，不能使用currentValue.key的形式
        temp.push(currentValue[key])
      })
      return temp;
    }
  },
  created () {
    axios({
      url: axiosUrl.getShoppingMallInfo,
      method: 'get'
    })
    .then(res => {
      if (res.status == 200) {
        let data = res.data.data
        this.category = data.category
        this.adBanner = data.advertesPicture.PICTURE_ADDRESS
        this.bannerPicArray = data.slides
        this.recommendGoods = data.recommend
        this.floorName = data.floorName
        // 注意这里的image必须使用引号，否则为变量形式，vue是找不到这个变量的，会报错
        this.floor1 = this.srcPickup(data.floor1, 'image')
        this.floor2 = this.srcPickup(data.floor2, 'image')
        this.floor3 = this.srcPickup(data.floor3, 'image')
        this.hotGoods = data.hotGoods
      }
      console.log(res)
    })
    .catch(error => {
      console.log(error)
    })
  }
}
</script>

<style lang="less" scoped>
/* search bar area */
.search-bar{
  height: 2.2rem;
  line-height:2.2rem;
  background-color: #e5017d;
  overflow: hidden;
  .location-icon{
    width: 50%;
    padding-top: .5rem;
    padding-left: .3rem;
  }
  .header-search {
    border-bottom: 1px solid #fff;
    width: 90%;
    height: 1.3rem;
    font-size: .875rem;
    background-color: #e5017d;
    color: #fff;
  }
  /* 改变input中placeholder的默认颜色 */
  ::-webkit-input-placeholder { /* WebKit, Blink, Edge */
    color: #ccc;;
  }
  :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color: #ccc;;
  }
  ::-moz-placeholder { /* Mozilla Firefox 19+ */
    color: #ccc;;
  }
  :-ms-input-placeholder { /* Internet Explorer 10-11 */
    color: #ccc;
  }
}
/* swiper area */
.swiper {
  clear: both;
}
/* typebar area */
.type-bar{
  background-color: #fff;
  margin:0 .3rem .3rem .3rem;
  border-radius: .3rem;
  display: flex; 
  div{
    flex: 1;
    padding: .3rem;
    font-size: .75rem;
    text-align: center;
  }
}
/* recommend goods area */
.recommend-area{
  background-color: #fff;s
  margin-top: .3rem;
  .recommend-title{
    border-bottom:1px solid #eee;
    font-size:14px;
    padding:.2rem;
    color:#e5017d;
  }
  .recommend-body{
    border-bottom: 1px solid #eee;
    .goods-item{
      width:99%;
      border-right: 1px solid #eee;
      font-size: .75rem;
      text-align: center;
    }
  }
}
/* hot area */
.hot-area{
  text-align: center;
  font-size:14px;
  height: 1.8rem;
  line-height:1.8rem;
}
</style>