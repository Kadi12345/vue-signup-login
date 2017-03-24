<template>
  <div class="small-12 medium-7 large-5 small-centered columns bgc-h76b852 border-radius-3 margin-top-35">
    <div class="text-align-center font-size-32-s white padding-top-20">{{ title }} <i class="material-icons font-size-36-i">&#xE85E</i></div>

    <div class="row">
      <div class="small-11 columns small-centered margin-top-20">
        <div class="width-93p bgc-white font-size-1 line-height-9 margin-0-auto">&nbsp</div>
          <component v-bind:is="currentForm" v-on:switchcomponent="switchComponent"></component>
        </div>
    </div>
  </div>
</template>

<script>
import Login from '@/components/Login'
import Signup from '@/components/Signup'

export default {
  name: 'Parent',
  components: {
    login: Login,
    signup: Signup,
    forgotpassword: {},
    changepassword: {},
    confirmemail: {},
    loginsuccess: {}
  },
  data () {
    return {
      title: 'Sign Up or Login',
      email: '',
      currentForm: 'login'
    }
  },
  methods: {
    switchComponent: function (componentArgs) {
      // compontentArgs format: [name, title, email (Use empty string if N/A.)]
      let name = 0
      let title = 1
      let email = 2
      console.log('component: ' + componentArgs)
      this.currentForm = componentArgs[name]
      this.title = componentArgs[title]
      this.email = componentArgs[email]
    },
    isValidComponent: function (componentArgs) {
      return false
    }
  }
}
</script>
