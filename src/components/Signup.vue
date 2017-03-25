<template>
  <form id="signupform" class="form input-underline" v-on:submit.prevent="addUser">
    <div class="display-none he4ad28 h336699 h488957 h6a3072" v-show="false"></div>

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
        <span v-bind:class="humanizedCSS" v-show="validation.password && validation.passwordlength">{{ humanizedScore }}</span>
        <span class="hb85276 float-right" v-show="validation.password && validation.passwordstrength && !validation.passwordlength">Max Len {{ maxLength }}</span>

        <input id="password" type="password" class="margin-bottom-0-i" v-on:keyup="reactToScore" v-model="newUser.password" v-bind:maxlength="maxLength">
      </div>
      <!--Password Strength Indicator TODO: Allow this to be disabled.-->
      <div class="small-12 columns margin-top-2">
        <div class="inline-block bgc-hf2f2f2 width-85p margin-top-5">
          <div v-bind:style="scorePercentStyle" class="height-0_8rem"></div>
        </div>

        <span v-bind:class="humanizedCSS">{{ passwordScore }}</span>
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
        <span class="hb85276" v-show="!validation.confirmpassword || validation.passwordsmatch">&nbsp</span>
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

    <div class="row text-align-center margin-top-10">
      <div class="small-12 columns">
        Already a member?
        <span class="cursor-pointer h1779ba he4ad28-hover" v-show="userExists" v-on:click="login">Login</span>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: 'Signup',
  props: ['emailentry'],
  data () {
    return {
      emailRE: /\S+@\S+/,
      maxLength: 254,       // Email Maximum Length Reference: https://en.wikipedia.org/wiki/Email_address
      minPasswordScore: 25,
      newUser: {
        email: this.emailentry,
        password: '',
        confirmPassword: ''
      },
      humanizedScore: 'Invalid',
      humanizedCSS: 'float-right ',
      scorePercentStyle: 'width: 0%; background-color: #b85276;'
    }
  },
  methods: {
    addUser: function () {
      if (this.isValid) {

      }
    },
    login: function () {
//      console.log('sign up clicked')
      this.$emit('switchcomponent', ['login', 'Login', this.newUser.email])
    },
    reactToScore: function () {
      let score = this.passwordScore
      let tooWeak = 'b85276'
      let low = 'e4ad28'
      let medium = '336699'
      let strong = '488957'
      let wow = '488957'

      this.humanizedScore = 'Invalid'
      this.humanizedCSS = 'float-right '
      this.scorePercentStyle = 'width: 0%; background-color: #b85276;'

      if (score < 25) {
        this.humanizedScore = 'Too Weak'
        this.humanizedCSS += ' h' + tooWeak
        this.scorePercentStyle = 'width: ' + score + '%; background-color: #' + tooWeak + ';'
      } else if (score < 50) {
        this.humanizedScore = 'Low'
        this.humanizedCSS += ' h' + low
        this.scorePercentStyle = 'width: ' + score + '%; background-color: #' + low + ';'
      } else if (score < 75) {
        this.humanizedScore = 'Medium'
        this.humanizedCSS += ' h' + medium
        this.scorePercentStyle = 'width: ' + score + '%; background-color: #' + medium + ';'
      } else if (score < 100) {
        this.humanizedScore = 'Strong'
        this.humanizedCSS += ' h' + strong
        this.scorePercentStyle = 'width: ' + score + '%; background-color: #' + strong + ';'
      } else if (score >= 100) {
        this.humanizedScore = 'Wow!'
        this.humanizedCSS += ' bold h' + wow
        this.scorePercentStyle = 'width: ' + score + '%; background-color: #' + wow + ';'
      } else {
        console.error('invalid password score')
        this.humanizedScore = 'Invalid'
        this.humanizedCSS += ' h' + tooWeak
        this.scorePercentStyle = 'width: 0%; background-color: #' + tooWeak + ';'
      }
    }
  },
  computed: {
    userExists: function () {
      // TODO: If user exists change view.
      return true
    },
    validation: function () {
      return {
        email: !!this.newUser.email.trim(),
        emaillength: this.newUser.email.trim().length <= this.maxLength,
        emailformat: this.emailRE.test(this.newUser.email),
        password: !!this.newUser.password.trim(),
        passwordstrength: this.passwordScore >= this.minPasswordScore,
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
    },
    passwordScore: function () {
      /**
       * Scores a password's strength.
       *
       * It scores a password according to character variation, repetition, email similarity, common patterns,
       * and length.
       *
       * The passwords are scored on an integer scale with no upper or lower bound.
       * Scores less than 0 are set to 0.
       * Scores greater than 100 are set to 100.
       * A safe password score is generally 50 points or more.
       *
       * @param {String} pwd The password string to score.
       *
       * @returns {Number} The password score.
       *
       * @see https://gist.github.com/stgogm/8a5edafa39f4d8d393520e2b40ee72e1
       * @see https://stackoverflow.com/questions/948172/password-strength-meter/11268104#11268104
      **/
      let email = this.newUser.email
      let password = this.newUser.password.trim()
      let check, ltr, i, l
      let variation = 0
      let letters = {}
      let lowerBound = 0
      let upperBound = 100
      let score = 0

      // No Password
      if (!password) {
        return 0
      }

      // Password identical to email address.
      if (password === email) {
        return 0
      }

      /* Score character variation */
      let variations = {
        lower: /[a-z]/.test(password),
        upper: /[A-Z]/.test(password),
        nonWords: /\W/.test(password),
        digits: /\d/.test(password)
      }

      for (check in variations) {
        variation += variations[check] ? 1 : 0
      }

      score += (variation - 1) * 10

      /* Score unique letters until 5 repetitions */
      for (i = 0, l = password.length; i < l; i++) {
        ltr = letters[password[i]] = (letters[password[i]] || 0) + 1
        score += 5 / ltr
      }

      /* Score length (about 8 chars for a safe password) */
      score -= 16 - (password.length / 16)

      /* Set upper and lower bounds to 100 and 0 respectively. */
      if (score > upperBound) { score = upperBound }
      if (score < lowerBound) { score = lowerBound }

      return parseInt(score)
    }
  }
}
</script>
