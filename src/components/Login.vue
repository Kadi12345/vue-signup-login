<template>
  <form id="loginform" class="form input-underline" v-on:submit.prevent="loginUser">
    <div class="display-none he4ad28 h336699 h488957 h6a3072" v-show="false"></div>

    <div class="row">
      <div class="small-12 columns">
        <a href="#" class="social-button" id="facebook-connect"></a>
        <a href="#" class="social-button" id="google-connect"></a>
        <a href="#" class="social-button" id="twitter-connect"></a>
        <a href="#" class="social-button" id="github-connect"></a>
      </div>

      <!--<div class="small-12 columns">-->
        <!--<div class="inline-block bgc-white bgc-h24292e-hover">-->
          <!--<svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg" >-->
            <!--<path class="fill-h24292e fill-white-hover" d="M10 0C4.476 0 0 4.477 0 10c0 4.418 2.865 8.166 6.84 9.49.5.09.68-.218.68-.483 0-.237-.007-.866-.012-1.7-2.782.603-3.37-1.34-3.37-1.34-.454-1.157-1.11-1.464-1.11-1.464-.907-.62.07-.608.07-.608 1.003.07 1.53 1.03 1.53 1.03.893 1.53 2.342 1.087 2.912.83.09-.645.35-1.085.634-1.335-2.22-.253-4.555-1.11-4.555-4.943 0-1.09.39-1.984 1.03-2.683-.105-.253-.448-1.27.096-2.647 0 0 .84-.268 2.75 1.026C8.294 4.95 9.15 4.84 10 4.836c.85.004 1.705.115 2.504.337 1.91-1.294 2.747-1.026 2.747-1.026.548 1.377.204 2.394.1 2.647.64.7 1.03 1.592 1.03 2.683 0 3.842-2.34 4.687-4.566 4.935.36.308.678.92.678 1.852 0 1.336-.01 2.415-.01 2.743 0 .267.18.578.687.48C17.14 18.163 20 14.417 20 10c0-5.522-4.478-10-10-10" fill="#191717" fill-rule="evenodd"/>-->
          <!--</svg>-->
        <!--</div>-->
      <!--</div>-->
    </div>

    <div class="row">
      <div class="small-12 columns padding-top-20">
        Email
        <span class="hb85276 float-right" v-show="!validation.email">Required</span>
        <span class="hb85276 float-right" v-show="validation.email && !validation.emaillength">Max Len {{ maxLength }}</span>
        <span class="hb85276 float-right" v-show="validation.email && validation.emaillength && !validation.emailformat">Example: me@a.com</span>
        <span class="float-right cursor-pointer h1779ba black-hover" v-show="validation.email && validation.emaillength && validation.emailformat && !validation.emailexists" v-on:click="signup">Sign Up</span>

        <input id="email" type="text" v-model="user.email" placeholder="me@a.com" v-on:keyup.enter="submitEmail" v-bind:maxlength="maxLength">
      </div>
    </div>

    <div class="row margin-top-15" v-show="validation.emailexists">
      <div class="small-12 columns">
        Password <span class="hb85276 float-right" v-show="!validation.password">Required</span>
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
export default {
  name: 'Login',
  props: ['emailentry'],
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
