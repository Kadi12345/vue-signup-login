<template>
  <component v-bind:is="currentView"></component>
</template>

<script>
import Signup from '@/components/Signup'

export default {
  name: 'SignupLogin',
  components: {
    login: {},
    signup: Signup,
    forgotpassword: {},
    changepassword: {},
    confirm: {}
  },
  computed: {
    currentView: function () {
      return 'signup'
    }
  }
}
</script>
