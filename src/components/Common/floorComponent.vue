<template>
  <div class="floor">
    <div class="floor-title"> {{floorTitle}} </div>
    <!-- 不规则布局 -->
    <div class="floor-anomaly">
      <div class="floor-one"><img :src="floorData[0]"></div>
      <div>
        <div class="floor-two"><img :src="floorData[1]"></div>
        <div><img :src="floorData[2]"></div>
      </div>
    </div>
    <!-- 规则部分的布局 -->
    <div class="floor-rule">
      <div v-for="(item,index) of floorData.slice(3)" :key="index">
        <img :src="item">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'floorComponent',
  props: ['floorTitle','floorData']
}
</script>

<style lang="less" scoped>
  .floor {
    .floor-title{
      text-align:center;
      font-size:14px;
      height: 1.8rem;
      line-height: 1.8rem;
    }
    .floor-anomaly{
      display: flex;
      background-color: #fff;
      border-bottom:1px solid #ddd;
      .floor-anomaly div{
        width:10rem;
        box-sizing: border-box;
      }
      .floor-one{
        border-right:1px solid #ddd;
      }
      .floor-two{
        border-bottom:1px solid #ddd;
      }
    }
    .floor-rule {
      display: flex;
      flex-wrap:wrap;
      background-color: #fff;
      div{
        box-sizing: border-box;
        width:10rem;
        border-bottom:1px solid #ddd;
      }
      div:nth-of-type(odd){
        border-right: 1px solid #ddd;
      }
    }
  }
</style>