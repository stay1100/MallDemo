// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {Button, Row, Col, Swipe, SwipeItem, Lazyload, List, Field, NavBar, Toast, Tabs, Tab, PullRefresh} from 'vant'
import '@/assets/style/reset.css'

Vue.config.productionTip = false
Vue.use(Button)
   .use(Row)
   .use(Col)
   .use(Swipe)
   .use(SwipeItem)
   .use(Lazyload)
   .use(List)
   .use(Field)
   .use(NavBar)
   .use(Toast)
   .use(Tabs)
   .use(Tab)
   .use(PullRefresh)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
