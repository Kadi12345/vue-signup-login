<template>
  <form id="loginform" class="form input-underline" v-on:submit.prevent="loginUser">
    <div class="display-none he4ad28 h336699 h488957 h6a3072" v-show="false"></div>

    <div class="row">
      <div class="small-12 columns padding-top-20">
        Email
        <span class="hb85276 float-right" v-show="!validation.email">Required</span>
        <input id="email" type="text" v-model="user.email" placeholder="me@a.com" v-bind:maxlength="maxLength">
      </div>
    </div>

    <div class="row margin-top-15">
      <div class="small-12 columns">
        Password <span class="hb85276 float-right" v-show="!validation.password">Required</span>
        <input id="password" type="password" class="margin-bottom-0-i" v-on:keyup="reactToScore" v-model="user.password" v-bind:maxlength="maxLength">
      </div>
    </div>

    <div class="row margin-top-20 text-align-center">
      <div class="small-6 columns" v-on:click="forgotPassword">Forgot Password</div>
      <div class="small-6 columns" v-on:click="signup">Sign Up</div>

      <div class="small-12 columns">
        <button id="submit" class="button font-size-20-s padding-16-s-i border-radius-5" v-bind:disabled="!isValid" type="submit" name="submit">
          <span>Login</span>
        </button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      user: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    loginUser: function () {
      if (this.isValid) {

      }
    },
    forgotPassword: function () {
      this.$emit('forgotPassword')
    },
    signUp: function () {

    }
  },
  computed: {
    validation: function () {
      return {
        email: !!this.user.email.trim(),
        password: !!this.user.password.trim()
      }
    },
    isValid: function () {
      let validation = this.validation
      return Object.keys(validation).every(function (key) {
        return validation[key]
      })
    }
  }
}
</script>
