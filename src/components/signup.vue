<template>
  <div class="small-12 medium-6 large-4 columns bgc-h76b852 same-height">
    <div class="text-align-center font-size-32-s white margin-top-20">Create a Person <i class="material-icons font-size-36-i">&#xE84E;</i></div>

    <div class="row">
      <div class="small-11 columns small-centered margin-top-20">
        <div class="width-93p bgc-white font-size-1 line-height-9 margin-0-auto">&nbsp;</div>
        <form id="{[ input_id['creationform'] ]}" class="form input-underline" v-on:submit.prevent="addPerson">
          <div class="row">
            <div class="small-12 columns">
              First Name
              <span class="hb85276 float-right" v-show="!validation.firstname">Required</span>
              <span class="hb85276 float-right" v-show="validation.firstname && !validation.firstnamelength">Max Len {[ name_max_length ]}</span>
              <input id="{[ input_id['firstname'] ]}" type="text" v-model="newPerson.firstname" placeholder="Xithurian" maxlength="{[ name_max_length ]}">
            </div>
          </div>

          <div class="row margin-top-15">
            <div class="small-12 columns">
              Last Name <span class="hb85276 float-right" v-show="!validation.lastname">Required</span>
              <span class="hb85276 float-right" v-show="validation.lastname && !validation.lastnamelength">Max Len {[ name_max_length ]}</span>
              <input id="{[ input_id['lastname'] ]}" type="text" v-model="newPerson.lastname" placeholder="Ulon" maxlength="{[ name_max_length ]}">
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
  name: 'signup',
  data () {
    return {
      emailRE: /\S+@\S+/,
      newUser: {
        email: '',
        username: '',
        password: '',
        confirm_password: ''
      }
    }
  },
  computed: {
    validation: function () {
      return {
        email: !!this.newUser.email.trim(),
        email_format: this.emailRE.test(this.newUser.email),
        username: !!this.newUser.username.trim(),
        password: !!this.newUser.password.trim(),
        confirm_password: !!this.newUser.confirm_password.trim(),
      }
    },
    isValid: function () {
      let validation = this.validation;
      return Object.keys(validation).every(function (key) {
        return validation[key]
      })
    },
  },
}
</script>
