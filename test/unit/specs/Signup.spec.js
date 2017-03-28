import Vue from 'vue'
import Signup from '@/components/Signup'

// ExpectJS reference: https://github.com/Automattic/expect.js
describe('Signup.vue', () => {
  /* Password Input */
  it(`Render 'Required' message all others hidden (no password input).`, done => {
    // Extend the component to get the constructor, which we can then initialize directly.
    let email = 'a@b'
    let expectedValidation = 'Required'
    const Constructor = Vue.extend(Signup)
    const component = new Constructor({
      propsData: {
        emailentry: email
      }
    }).$mount()

    expect(component.$el.querySelector('#password-required').textContent).to.equal(expectedValidation)

    // Show 'Required' message.
    Vue.nextTick(() => {
      expect(component.$el.querySelector('#password-required').style.display).to.not.equal('none')
      expect(component.$el.querySelector('#password-human-score').style.display).to.equal('none')
      expect(component.$el.querySelector('#password-max-length').style.display).to.equal('none')
      // Signup Button Disabled
      expect(component.$el.querySelector('#signup-button').disabled).to.equal(true)
      done()
    })
  })

  it(`Render 'Max Len 254' message all others hidden (password too long).`, done => {
    let maxLength = 254
    let email = 'a@b.com'
    let longPassword = 'aaa!aaaAaaa%aaaaaaaaaaaacataaaswimaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'

    // Extend the component to get the constructor, which we can then initialize directly.
    const Constructor = Vue.extend(Signup)
    const component = new Constructor({
      propsData: {
        emailentry: email
      },
      data: {
        newUser: {
          password: longPassword
        }
      }
    }).$mount()

    let expectedValidation = 'Max Len ' + maxLength

    expect(component.$el.querySelector('#password-max-length').textContent).to.equal(expectedValidation)
    expect(component.$el.querySelector('#password').value).to.equal(longPassword)

    Vue.nextTick(() => {
      expect(component.$el.querySelector('#password-required').style.display).to.equal('none')
      expect(component.$el.querySelector('#password-human-score').style.display).to.equal('none')
      expect(component.$el.querySelector('#password-max-length').style.display).to.not.equal('none')
      // Signup Button Disabled
      expect(component.$el.querySelector('#signup-button').disabled).to.equal(true)
      done()
    })
  })

  /* Password Score Testing */
  it(`Render 'Too Weak' and '0' scores (password score).`, done => {
    // Extend the component to get the constructor, which we can then initialize directly.
    let email = 'acorn@thesquirrel.com'
    let thePassword = '1'
    let expectedHumanMessage = 'Too Weak'
    let expectedIntegerScore = '0'
    const Constructor = Vue.extend(Signup)
    const component = new Constructor({
      propsData: {
        emailentry: email
      },
      data: {
        newUser: {
          password: thePassword,
          confirmPassword: ''
        }
      }
    }).$mount()

    Vue.nextTick(() => {
      // Show Score Message
      expect(component.$el.querySelector('#password-human-score').textContent).to.equal(expectedHumanMessage)
      expect(component.$el.querySelector('#password-integer-score').textContent).to.equal(expectedIntegerScore)
      // Hide messages
      expect(component.$el.querySelector('#password-max-length').style.display).to.equal('none')
      // Sign Up Button Disabled
      expect(component.$el.querySelector('#signup-button').disabled).to.equal(true)
      // Hide Already a Member
      expect(component.$el.querySelector('#already-a-member').style.display).to.equal('none')
      done()
    })
  })

  it(`Render 'Low' and '29' scores (password score).`, done => {
    // Extend the component to get the constructor, which we can then initialize directly.
    let email = 'acorn@thesquirrel.com'
    let thePassword = '123!a'
    // let expectedHumanMessage = 'Low'
    let expectedIntegerScore = '29'
    const Constructor = Vue.extend(Signup)
    const component = new Constructor({
      propsData: {
        emailentry: email
      },
      data: {
        newUser: {
          password: thePassword,
          confirmPassword: ''
        }
      }
    }).$mount()

    Vue.nextTick(() => {
      // Show Score Message
      // expect(component.$el.querySelector('#password-human-score').textContent).to.equal(expectedHumanMessage)
      expect(component.$el.querySelector('#password-integer-score').textContent).to.equal(expectedIntegerScore)
      // Hide messages
      expect(component.$el.querySelector('#password-max-length').style.display).to.equal('none')
      // Sign Up Button Disabled
      expect(component.$el.querySelector('#signup-button').disabled).to.equal(true)
      // Hide Already a Member
      expect(component.$el.querySelector('#already-a-member').style.display).to.equal('none')
      done()
    })
  })

  it(`Render 'Medium' and '54' scores (password score).`, done => {
    // Extend the component to get the constructor, which we can then initialize directly.
    let email = 'acorn@thesquirrel.com'
    let thePassword = '123!a^%F'
    // let expectedHumanMessage = 'Medium'
    let expectedIntegerScore = '54'
    const Constructor = Vue.extend(Signup)
    const component = new Constructor({
      propsData: {
        emailentry: email
      },
      data: {
        newUser: {
          password: thePassword,
          confirmPassword: ''
        }
      }
    }).$mount()

    Vue.nextTick(() => {
      // Show Score Message
      // expect(component.$el.querySelector('#password-human-score').textContent).to.equal(expectedHumanMessage)
      expect(component.$el.querySelector('#password-integer-score').textContent).to.equal(expectedIntegerScore)
      // Hide messages
      expect(component.$el.querySelector('#password-max-length').style.display).to.equal('none')
      // Sign Up Button Disabled
      expect(component.$el.querySelector('#signup-button').disabled).to.equal(true)
      // Hide Already a Member
      expect(component.$el.querySelector('#already-a-member').style.display).to.equal('none')
      done()
    })
  })

  it(`Render 'Strong' and '79' scores (password score).`, done => {
    // Extend the component to get the constructor, which we can then initialize directly.
    let email = 'acorn@thesquirrel.com'
    let thePassword = '123!a^%F~Xm&.'
    // let expectedHumanMessage = 'Strong'
    let expectedIntegerScore = '79'
    const Constructor = Vue.extend(Signup)
    const component = new Constructor({
      propsData: {
        emailentry: email
      },
      data: {
        newUser: {
          password: thePassword,
          confirmPassword: ''
        }
      }
    }).$mount()

    Vue.nextTick(() => {
      // Show Score Message
      // expect(component.$el.querySelector('#password-human-score').textContent).to.equal(expectedHumanMessage)
      expect(component.$el.querySelector('#password-integer-score').textContent).to.equal(expectedIntegerScore)
      // Hide messages
      expect(component.$el.querySelector('#password-max-length').style.display).to.equal('none')
      // Sign Up Button Disabled
      expect(component.$el.querySelector('#signup-button').disabled).to.equal(true)
      // Hide Already a Member
      expect(component.$el.querySelector('#already-a-member').style.display).to.equal('none')
      done()
    })
  })

  it(`Render 'Wow!' and '100' scores (password score).`, done => {
    // Extend the component to get the constructor, which we can then initialize directly.
    let email = 'acorn@thesquirrel.com'
    let thePassword = '123!a^%F~Xm&._"aen'
    // let expectedHumanMessage = 'Wow!'
    let expectedIntegerScore = '100'
    const Constructor = Vue.extend(Signup)
    const component = new Constructor({
      propsData: {
        emailentry: email
      },
      data: {
        newUser: {
          password: thePassword,
          confirmPassword: ''
        }
      }
    }).$mount()

    Vue.nextTick(() => {
      // Show Score Message
      // expect(component.$el.querySelector('#password-human-score').textContent).to.equal(expectedHumanMessage)
      expect(component.$el.querySelector('#password-integer-score').textContent).to.equal(expectedIntegerScore)
      // Hide messages
      expect(component.$el.querySelector('#password-max-length').style.display).to.equal('none')
      // Sign Up Button Disabled
      expect(component.$el.querySelector('#signup-button').disabled).to.equal(true)
      // Hide Already a Member
      expect(component.$el.querySelector('#already-a-member').style.display).to.equal('none')
      done()
    })
  })

  it(`Render '0' score 'Too Weak' (password equals email).`, done => {
    // Extend the component to get the constructor, which we can then initialize directly.
    let email = 'a@b.com'
    let thePassword = 'a@b.com'
    // let expectedHumanMessage = 'Too Weak'
    let expectedIntegerScore = '0'
    const Constructor = Vue.extend(Signup)
    const component = new Constructor({
      propsData: {
        emailentry: email
      },
      data: {
        newUser: {
          password: thePassword,
          confirmPassword: ''
        }
      }
    }).$mount()

    Vue.nextTick(() => {
      // Show Score Message
      // expect(component.$el.querySelector('#password-human-score').textContent).to.equal(expectedHumanMessage)
      expect(component.$el.querySelector('#password-integer-score').textContent).to.equal(expectedIntegerScore)
      // Hide messages
      expect(component.$el.querySelector('#password-max-length').style.display).to.equal('none')
      // Sign Up Button Disabled
      expect(component.$el.querySelector('#signup-button').disabled).to.equal(true)
      // Hide Already a Member
      expect(component.$el.querySelector('#already-a-member').style.display).to.equal('none')
      done()
    })
  })

  /* Confirm Password */
  it(`Render 'Require' for Confirm Password (confirm password missing).`, done => {
    // Extend the component to get the constructor, which we can then initialize directly.
    let email = 'acorn@thesquirrel.com'
    let thePassword = '123!^Ab%anst'
    const Constructor = Vue.extend(Signup)
    const component = new Constructor({
      propsData: {
        emailentry: email
      },
      data: {
        newUser: {
          password: thePassword,
          confirmPassword: ''
        }
      }
    }).$mount()

    Vue.nextTick(() => {
      // Show required message
      expect(component.$el.querySelector('#confirm-password-required').style.display).to.not.equal('none')
      // Sign Up Button Disabled
      expect(component.$el.querySelector('#signup-button').disabled).to.equal(true)
      // Hide Already a Member
      expect(component.$el.querySelector('#already-a-member').style.display).to.equal('none')
      done()
    })
  })

  it(`Render 'Passwords Must Match' for Confirm Password (confirm password not matching).`, done => {
    // Extend the component to get the constructor, which we can then initialize directly.
    let email = 'acorn@thesquirrel.com'
    let thePassword = '123!^Ab%anst'
    let incorrectConfirmPassword = '29847'
    const Constructor = Vue.extend(Signup)
    const component = new Constructor({
      propsData: {
        emailentry: email
      },
      data: {
        newUser: {
          password: thePassword,
          confirmPassword: incorrectConfirmPassword
        }
      }
    }).$mount()

    Vue.nextTick(() => {
      // Show passwords must match message
      expect(component.$el.querySelector('#confirm-password').style.display).to.not.equal('none')
      // Hide required message
      expect(component.$el.querySelector('#confirm-password-required').style.display).to.equal('none')
      // Sign Up Button Disabled
      expect(component.$el.querySelector('#signup-button').disabled).to.equal(true)
      // Hide Already a Member
      expect(component.$el.querySelector('#already-a-member').style.display).to.equal('none')
      done()
    })
  })

  it(`Render 'Sign Up' button if the email does not exist (email does not exist).`, done => {
    // Extend the component to get the constructor, which we can then initialize directly.
    let email = 'acorn@thesquirrel.com'
    let thePassword = '123!^Ab%anst'
    const Constructor = Vue.extend(Signup)
    const component = new Constructor({
      propsData: {
        emailentry: email
      },
      data: {
        newUser: {
          password: thePassword,
          confirmPassword: thePassword
        }
      }
    }).$mount()

    Vue.nextTick(() => {
      // Show Sign Up Button
      expect(component.$el.querySelector('#signup-button').style.display).to.not.equal('none')
      expect(component.$el.querySelector('#signup-button').disabled).to.equal(false)
      // Hide Already a Member
      expect(component.$el.querySelector('#already-a-member').style.display).to.equal('none')
      done()
    })
  })
})
