<template>
  <div class="small-12 medium-8 large-5 small-centered columns bgc-h76b852 border-radius-3 margin-top-20">
    <div class="row text-align-center font-size-32-s white padding-top-20">{{ title }} <i class="material-icons font-size-36-i">&#xE85E</i></div>

    <div class="row">
      <div class="small-11 columns small-centered margin-top-35">
        <div class="width-93p bgc-white font-size-1 line-height-9 margin-0-auto">&nbsp</div>
          <component v-bind:is="currentForm" v-bind:emailentry="email" v-on:switchcomponent="switchComponent"></component>
        </div>
    </div>
  </div>
</template>

<script>
import Login from '@/components/Login'
import ForgotPassword from '@/components/ForgotPassword'
import Signup from '@/components/Signup'
import CheckEmail from '@/components/CheckEmail'

export default {
  name: 'Parent',
  components: {
    login: Login,
    forgotpassword: ForgotPassword,
    resetpassword: {},    // requires email confirmation link
    changepassword: {},   // requires current password NOT sure this is required here seems like a profile feature
    signup: Signup,
    checkemail: CheckEmail,
    confirmemail: {},
    signupsuccess: {}
  },
  data () {
    return {
      title: 'Login or Sign Up',
      email: '',
      currentForm: 'login',
      nameIndex: 0,
      titleIndex: 1,
      emailIndex: 2,
      exactLength: 3
    }
  },
  methods: {
    // https://forum.vuejs.org/t/vue2-0-parent-component-cannot-listen-to-emit-event-in-child-component-by-on/2336/3
    switchComponent: function (componentArgs) {
      // componentArgs format: [name, title, email (Use empty string if N/A.)]
      console.log('component: ' + componentArgs)

      if (this.isValidComponentArgs(componentArgs)) {
        this.currentForm = componentArgs[this.nameIndex]
        this.title = componentArgs[this.titleIndex]
        this.email = componentArgs[this.emailIndex]
      }
    },
    validation: function (componentArgs) {
      // http://stackoverflow.com/a/43011710/1783439
      return {
        argslength: componentArgs.length === this.exactLength,
        ischildcomponent: !!this.$options.components[componentArgs[this.nameIndex]]
      }
    },
    isValidComponentArgs: function (componentArgs) {
      let validation = this.validation(componentArgs)
      return Object.keys(validation).every(function (key) {
        return validation[key]
      })
    }
  }
}
</script>
