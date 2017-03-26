import Vue from 'vue'
import ForgotPassword from '@/components/ForgotPassword'

// ExpectJS reference: https://github.com/Automattic/expect.js

describe('ForgotPassword.vue', () => {
  it(`Render emailentry in reset password message.`, () => {
    // Extend the component to get the constructor, which we can then initialize directly.
    let email = 'a@b.com'
    const Constructor = Vue.extend(ForgotPassword)
    const component = new Constructor({
      propsData: {
        emailentry: email
      }
    }).$mount()

    expect(component.$el.textContent).to.contain(email)
  })
})
