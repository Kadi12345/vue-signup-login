<template>
  <form id="userform" class="form input-underline" v-on:submit.prevent="addUser">
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
        <input id="password" type="password" v-model="newUser.password" v-bind:maxlength="maxLength">
      </div>
      <div class="small-12 columns">
        <meter min="0" low="25" optimum="50" high="75" max="100" class="width-90p" v-bind:value="passwordScore"></meter>
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
  </form>
</template>

<script>
export default {
  name: 'SignupLogin',
  data () {
    return {
      emailRE: /\S+@\S+/,
      maxLength: 254,       // Email Maximum Length Reference: https://en.wikipedia.org/wiki/Email_address
      minPasswordScore: 25,
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
    },
    humanizedScore: function () {
      let score = this.passwordScore
      let humanized = 'Invalid'

      if (score < 25) {
        humanized = 'Too Weak'
      } else if (score < 50) {
        humanized = 'Low'
      } else if (score < 75) {
        humanized = 'Medium'
      } else if (score < 100) {
        humanized = 'Strong'
      } else if (score >= 100) {
        humanized = 'Wow!'
      } else {
        console.error('invalid password score')
        humanized = 'Invalid'
      }

      return humanized
    },
    humanizedCSS: function () {
      let score = this.passwordScore
      let humanized = 'float-right '

      if (score < 25) {
        humanized += ' hb85276 '
      } else if (score < 50) {
        humanized += ' he4ad28 '
      } else if (score < 75) {
        humanized += ' h336699 '
      } else if (score < 100) {
        humanized += ' h488957 '
      } else if (score >= 100) {
        humanized += ' h488957 bold '
      } else {
        humanized += ' hb85276 '
      }

      return humanized
    }
  }
}
</script>
