<template>
  <form id="loginform" class="form input-underline" v-on:submit.prevent="loginUser">
    <div class="display-none he4ad28 h336699 h488957 h6a3072" v-show="false"></div>

    <social></social>

    <div class="row">
      <div class="small-12 columns padding-top-15">
        Email
        <span id="email-required" class="hb85276 float-right" v-show="!validation.email">Required</span>
        <span id="email-max-length" class="hb85276 float-right" v-show="validation.email && !validation.emaillength">Max Len {{ maxLength }}</span>
        <span id="email-example" class="hb85276 float-right" v-show="validation.email && validation.emaillength && !validation.emailformat">Example: me@a.com</span>
        <span id="email-not-found" class="float-right cursor-pointer h1779ba black-hover" v-show="validation.email && validation.emaillength && validation.emailformat && !validation.emailexists" v-on:click="signup">Sign Up</span>

        <input id="email" type="text" v-model="user.email" placeholder="me@a.com" v-on:keyup.enter="submitEmail" v-bind:maxlength="maxLength">
      </div>
    </div>

    <div class="row margin-top-15" v-show="validation.emailexists">
      <div class="small-12 columns">
        Password <span id="password-required" class="hb85276 float-right" v-show="!validation.password">Required</span>
        <input id="password" type="password" class="margin-bottom-0-i" v-model="user.password" v-bind:maxlength="maxLength">
      </div>
    </div>

    <div class="row margin-top-20 text-align-center" v-show="validation.emailexists">
      <div class="small-6 columns text-align-left cursor-pointer h1779ba he4ad28-hover" v-on:click="forgotPassword">Forgot Password</div>
      <div class="small-6 columns text-align-right cursor-pointer h1779ba he4ad28-hover" v-on:click="signup">Sign Up</div>

      <div class="small-12 columns margin-top-20">
        <button id="submit" class="button font-size-20-s padding-16-s-i border-radius-5" v-bind:disabled="!isValid" type="submit" name="submit">
          <span>Login</span>
        </button>
      </div>
    </div>

    <div class="row margin-top-20 text-align-center">
      <div class="small-12 columns margin-top-20">
        <button class="button font-size-20-s padding-16-s-i border-radius-5" v-on:click="signup"
                v-show="validation.email && validation.emaillength && validation.emailformat && !validation.emailexists"
                type="submit" name="sign-up">
          <span>Sign Up</span>
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import Social from '@/components/Social'

export default {
  name: 'Login',
  props: ['emailentry'],
  components: {
    social: Social
  },
  data () {
    return {
      emailRE: /\S+@\S+/,
      maxAttempts: 10,
      maxLength: 254,       // Email Maximum Length Reference: https://en.wikipedia.org/wiki/Email_address
      user: {
        email: this.emailentry,
        password: ''
      },
      knownEmails: ['a@b', 'test@test.com']
    }
  },
  methods: {
    loginUser: function () {
      if (this.isValid) {

      }
    },
    forgotPassword: function () {
//      console.log('forgotPassword clicked')
      this.$emit('switchcomponent', ['forgotpassword', 'Forgot Password', this.user.email])
    },
    signup: function () {
//      console.log('sign up clicked')
      this.$emit('switchcomponent', ['signup', 'Sign Up', this.user.email])
    },
    emailExists: function () {
      // https://jsperf.com/lodash-includes-vs-array-prototype-indexof
      return this.knownEmails.indexOf(this.user.email) > -1
    },
    submitEmail: function () {
      let validation = this.validation

      if (validation.email && validation.emaillength && validation.emailformat && !validation.emailexists) {
        this.signup()
      }
    }
  },
  computed: {
    validation: function () {
      return {
        email: !!this.user.email.trim(),
        emaillength: this.user.email.trim().length <= this.maxLength,
        emailformat: this.emailRE.test(this.user.email),
        emailexists: this.emailExists(),
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
