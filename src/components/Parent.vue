<template>
  <div class="small-12 medium-7 large-5 small-centered columns bgc-h76b852 border-radius-3 margin-top-20">
    <div class="row text-align-center font-size-32-s white padding-top-20">{{ title }} <i class="material-icons font-size-36-i">&#xE85E</i></div>

    <div class="row">
      <div class="small-11 columns small-centered margin-top-35">
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
      return {
        argslength: componentArgs.length === this.exactLength,
        ischildcomponent: true
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
