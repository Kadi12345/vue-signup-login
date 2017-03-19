<template>
  <div class="small-12 medium-6 large-4 columns bgc-h76b852 same-height">
    <div class="text-align-center font-size-32-s white margin-top-20">Sign Up or Login <i class="material-icons font-size-36-i">&#xE84E;</i></div>

    <div class="row">
      <div class="small-11 columns small-centered margin-top-20">
        <div class="width-93p bgc-white font-size-1 line-height-9 margin-0-auto">&nbsp;</div>
        <form id="userform] ]}" class="form input-underline" v-on:submit.prevent="addUser">
          <div class="row">
            <div class="small-12 columns">
              Email
              <span class="hb85276 float-right" v-show="!validation.email">Required</span>
              <span class="hb85276 float-right" v-show="validation.email && !validation.emaillength">Max Len {{ maxLength }}</span>
              <input id="{[ input_id['email'] ]}" type="text" v-model="newUser.email" placeholder="me@this.com" v-bind:maxlength="maxLength">
            </div>
          </div>

          <div class="row margin-top-15">
            <div class="small-12 columns">
              Password <span class="hb85276 float-right" v-show="!validation.password">Required</span>
              <span class="hb85276 float-right" v-show="validation.password && !validation.passwordlength">Max Len {{ maxLength }}</span>
              <input id="{[ input_id['password'] ]}" type="text" v-model="newUser.password" v-bind:maxlength="maxLength">
            </div>
          </div>

          <div class="row margin-top-35 text-align-center">
            <div class="small-12 columns">
              <button id="{[ input_id['submit'] ]}" class="button font-size-20-s padding-16-s-i" v-bind:disabled="!isValid" type="submit" name="submit">
                <i class="material-icons">&#xE87C;</i>
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
        confirm_password: ''
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
    validation: function () {
      return {
        email: !!this.newUser.email.trim(),
        email_format: this.emailRE.test(this.newUser.email),
        password: !!this.newUser.password.trim(),
        confirm_password: !!this.newUser.confirm_password.trim()
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
