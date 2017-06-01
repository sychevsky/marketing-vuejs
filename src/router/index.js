import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Payment from '@/pages/Payment'
import Account from '@/pages/Account'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/payment',
      name: 'Payment',
      component: Payment
    },
    {
      path: '/account-info',
      name: 'Account',
      component: Account
    }
  ]
})
