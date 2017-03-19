<template>
  <div class="small-12 medium-7 large-5 small-centered columns bgc-h76b852 border-radius-3 margin-top-35">
    <div class="text-align-center font-size-32-s white padding-top-20">Sign Up or Login <i class="material-icons font-size-36-i">&#xE85E</i></div>

    <div class="row">
      <div class="small-11 columns small-centered margin-top-20">
        <div class="width-93p bgc-white font-size-1 line-height-9 margin-0-auto">&nbsp</div>
          <component v-bind:is="currentForm"></component>
        </div>
    </div>
  </div>
</template>

<script>
import SignupLogin from '@/components/SignupLogin'

export default {
  name: 'Parent',
  components: {
    login: {},
    signup: SignupLogin,
    forgotpassword: {},
    changepassword: {},
    confirm: {}
  },
  computed: {
    currentForm: function () {
      return 'signup'
    }
  }
}
</script>
