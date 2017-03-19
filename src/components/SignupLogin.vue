<template>
  <div class="small-12 medium-7 large-5 small-centered columns bgc-h76b852 border-radius-3 margin-top-35">
    <div class="text-align-center font-size-32-s white padding-top-20">Sign Up or Login <i class="material-icons font-size-36-i">&#xE85E;</i></div>

    <div class="row">
      <div class="small-11 columns small-centered margin-top-20">
        <div class="width-93p bgc-white font-size-1 line-height-9 margin-0-auto">&nbsp;</div>
        <form id="userform" class="form input-underline" v-on:submit.prevent="addUser">
          <div class="row">
            <div class="small-12 columns padding-top-20">
              Email
              <span class="hb85276 float-right" v-show="!validation.email">Required</span>
              <span class="hb85276 float-right" v-show="validation.email && !validation.emaillength">Max Len {{ maxLength }}</span>
              <span class="hb85276 float-right" v-show="validation.email && validation.emaillength && !validation.emailformat">Example: me@a.com</span>
              <input id="email" type="text" v-model="newUser.email" placeholder="me@a.com" v-bind:maxlength="maxLength">
            </div>
          </div>

          <div class="row margin-top-15">
            <div class="small-12 columns">
              Password <span class="hb85276 float-right" v-show="!validation.password">Required</span>
              <span class="hb85276 float-right" v-show="validation.password && !validation.passwordlength">Max Len {{ maxLength }}</span>
              <input id="password" type="password" v-model="newUser.password" v-bind:maxlength="maxLength">
            </div>
          </div>

          <div class="row margin-top-15">
            <div class="small-12 columns">
              Confirm Password <span class="hb85276 float-right" v-show="!validation.confirmpassword">Required</span>
              <input id="confirmPassword" type="password" v-model="newUser.confirmPassword" v-bind:maxlength="maxLength">
            </div>
          </div>

          <div class="row text-align-center">
            <div class="small-12 columns">
              <span class="hb85276" v-show="!validation.confirmpassword || validation.passwordsmatch">&nbsp;</span>
              <span class="hb85276" v-show="validation.confirmpassword && !validation.passwordsmatch">Passwords Must Match</span>
            </div>
          </div>

          <div class="row margin-top-20 text-align-center">
            <div class="small-12 columns">
              <button id="submit" class="button font-size-20-s padding-16-s-i border-radius-5" v-bind:disabled="!isValid" type="submit" name="submit">
                <span>Sign Up</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SignupLogin',
  data () {
    return {
      emailRE: /\S+@\S+/,
      maxLength: 254,       // Email Maximum Length Reference: https://en.wikipedia.org/wiki/Email_address
      newUser: {
        email: '',
        password: '',
        confirmPassword: ''
      }
    }
  },
  method: {
    addUser: function () {
      if (this.isValid) {

      }
    }
  },
  computed: {
    userExists: function () {
      return true
    },
    validation: function () {
      return {
        email: !!this.newUser.email.trim(),
        emaillength: this.newUser.email.trim().length <= this.maxLength,
        emailformat: this.emailRE.test(this.newUser.email),
        password: !!this.newUser.password.trim(),
        passwordlength: this.newUser.password.trim().length <= this.maxLength,
        confirmpassword: !!this.newUser.confirmPassword.trim(),
        passwordsmatch: this.newUser.password.trim() === this.newUser.confirmPassword.trim()
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
