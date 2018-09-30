/**
 * 
 * 接口配置文件
 */
const BASEURL = "https://www.easy-mock.com/mock/5ae2eeb23fbbf24d8cd7f0b6/SmileVue/"
const LOCALURL = "http://localhost:3000/"
const URL = {
    getShoppingMallInfo: BASEURL + 'index',    // 商城首页接口
    registerUser: LOCALURL + 'user/register',   //用户注册接口
    loginUser: LOCALURL + 'user/login',   //用户登陆接口
    getDetailGoodsInfo : LOCALURL+'goods/getDetailGoodsInfo',  //获取商品详情
    getCateGoryList : LOCALURL+'goods/getCateGoryList',  //得到大类信息
    getCateGorySubList : LOCALURL+'goods/getCategorySubList',  //得到小类信息
    getGoodsListByCategorySubID : LOCALURL+'goods/getGoodsListByCategorySubID',  //得到小类商品信息
}
 
export default URL