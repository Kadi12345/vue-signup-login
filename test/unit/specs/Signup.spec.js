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
      expect(component.$el.querySelector('#password-score').style.display).to.equal('none')
      expect(component.$el.querySelector('#password-max-length').style.display).to.equal('none')
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
      expect(component.$el.querySelector('#password-score').style.display).to.equal('none')
      expect(component.$el.querySelector('#password-max-length').style.display).to.not.equal('none')
      done()
    })
  })

  // it(`Render 'Sign Up' if the email does not exist all others hidden (email does not exist).`, done => {
  //   // Extend the component to get the constructor, which we can then initialize directly.
  //   let email = 'acorn@thesquirrel.com'
  //   let expectedValidation = 'Sign Up'
  //   const Constructor = Vue.extend(Signup)
  //   const component = new Constructor({
  //     propsData: {
  //       emailentry: email
  //     }
  //   }).$mount()
  //
  //   expect(component.$el.querySelector('#email-not-found').textContent).to.equal(expectedValidation)
  //
  //   Vue.nextTick(() => {
  //     expect(component.$el.querySelector('#email-required').style.display).to.equal('none')
  //     expect(component.$el.querySelector('#email-max-length').style.display).to.equal('none')
  //     expect(component.$el.querySelector('#email-example').style.display).to.equal('none')
  //     // Input Message
  //     expect(component.$el.querySelector('#email-not-found').style.display).to.not.equal('none')
  //     // Sign Up Button
  //     expect(component.$el.querySelector('#signup-button').style.display).to.not.equal('none')
  //     done()
  //   })
  // })
})
