import Vue from 'vue'
import Router from 'vue-router'
import MallHome from '@/components/pages/MallHome'
import Register from '@/components/pages/Register'
import Login from '@/components/pages/Login'
import Goods from '@/components/pages/Goods'
import CategoryList from '@/components/pages/CategoryList'
import Cart from '@/components/pages/Cart'
import Navigation from '@/components/pages/Navigation'
import Member from '@/components/pages/Member'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Navigation',
      component: Navigation,
      children: [
        {
          path: '/',
          name: 'MallHome',
          component: MallHome
        },
        {
          path: '/CategoryList',
          name: 'CategoryList',
          component: CategoryList
        },
        {
          path: '/Cart',
          name: 'Cart',
          component: Cart
        },
        {
          path: '/Member',
          name: 'Member',
          component: Member
        }
      ]
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/Goods',
      name: 'Goods',
      component: Goods
    }
  ]
})
