import Vue from 'vue'
import Router from 'vue-router'
import SignupLogin from '@/components/SignupLogin'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'SignupLogin',
      component: SignupLogin
    }
  ]
})
